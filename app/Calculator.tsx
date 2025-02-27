"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { calculate_fanum_tax } from "./calc";
import { Attendance, deeznuts, Subject } from "./types";

export default function Calculator() {
  const [subject_count, set_subject_count] = useState(1);
  const [subjects, set_subjects] = useState<Subject[]>([]);
  const [results, set_results] = useState<Partial<deeznuts>>({});

  // Dynamically update subjects based on subject_count
  useEffect(() => {
    set_subjects((prev) => {
      set_results({});
      if (prev.length < subject_count) {
        return [
          ...prev,
          ...Array(subject_count - prev.length).fill({
            name: "",
            attendence: { theory: 0, lab: 0, tutorial: 0 },
            total_classes: { theory: 0, lab: 0, tutorial: 0 },
          }),
        ];
      } else {
        return prev.slice(0, subject_count);
      }
    });
  }, [subject_count]);

  function calculate() {
    if (subject_count < 1) {
      return;
    }
    const res = calculate_fanum_tax(subjects);

    console.table({
      min_tax_required: res.min_tax_required,
      percent_min_tax_required: res.percent_min_tax_required,
      percent_tax_paid: res.percent_tax_paid,
      possible_fanum_tax_writeoff: res.possible_fanum_tax_writeoff,
    });
    console.log({ attendence_by_subject: res.percent_tax_paid_by_subject });

    set_results(res);
    if(res.possible_fanum_tax_writeoff === 0) {
      alert(
        `Your overall attendence is ${results.percent_tax_paid?.toFixed(1)} % \nEdging streak maintained!!`,
      );
    }
    else if (res.possible_fanum_tax_writeoff > 0) {
      alert(
        `Congrats! Your overall attendence is ${results.percent_tax_paid?.toFixed(1)} % \nyou are eligible for Fanum Tax Writeoff of ${res.possible_fanum_tax_writeoff.toFixed(0)} lectures`,
      );
    } else {
      alert(
        `${res.possible_fanum_tax_writeoff * -1} lectures in debt \ncall ur parents now!!`,
      );
    }
  }

  return (
    <div className="flex h-[800px] items-center justify-center flex-col gap-4">
      {/* Input for Number of Subjects */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Subjects:
        </label>
        <Input
          type="number"
          placeholder="Enter number of subjects"
          value={subject_count}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            if (val < 0) {
              alert("fuck off");
              set_subject_count(0);
              return;
            }
            if (val > 10) {
              alert("Max 10 subjects allowed");
              set_subject_count(10);
              return;
            }
            set_subject_count(val);
          }}
        />
      </div>

      {/* Dynamic Inputs for Each Subject */}
      <div className="flex flex-col gap-6 w-full max-w-3xl overflow-auto">
        {subjects.map((subject, i) => (
          <div key={i} className="p-6 border rounded-lg shadow-md bg-gray-50">
            {/* Subject Name */}
            <div className="flex flex-row justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject {i + 1} Name:
                </label>
                <Input
                  type="text"
                  placeholder={`Enter Subject ${i + 1} Name`}
                  value={subject.name}
                  onChange={(e) =>
                    set_subjects((prev) => {
                      const newSubjects = [...prev];
                      newSubjects[i] = {
                        ...newSubjects[i],
                        name: e.target.value,
                      };
                      return newSubjects;
                    })
                  }
                />
              </div>
              {results.percent_tax_paid_by_subject && (
                <span className="block text-base font-bold text-gray-700">
                  {results.percent_tax_paid_by_subject[i].toFixed(2)} %
                </span>
              )}
            </div>

            {/* Loop to Render Inputs for All Keys in Attendance */}
            <div className="grid grid-cols-3 gap-6 mt-4">
              {(Object.keys(subject.attendence) as (keyof Attendance)[]).map(
                (category) => (
                  <div
                    key={category}
                    className="p-4 border rounded-md bg-white shadow-sm"
                  >
                    <p className="text-lg font-semibold capitalize text-gray-800">
                      {category}
                    </p>

                    {/* Classes Attended Input */}
                    <label className="block text-sm font-medium text-gray-600 mt-2">
                      Classes Attended:
                    </label>
                    <Input
                      type="number"
                      placeholder="Attended"
                      value={subjects[i].attendence[category]}
                      onChange={(e) =>
                        set_subjects((prev) => {
                          const newSubjects = [...prev];
                          newSubjects[i] = {
                            ...newSubjects[i],
                            attendence: {
                              ...newSubjects[i].attendence,
                              [category]: parseInt(e.target.value) || 0,
                            },
                          };
                          return newSubjects;
                        })
                      }
                    />

                    {/* Total Classes Input */}
                    <label className="block text-sm font-medium text-gray-600 mt-2">
                      Total Classes:
                    </label>
                    <Input
                      type="number"
                      placeholder="Total"
                      value={subjects[i].total_classes[category]}
                      onChange={(e) =>
                        set_subjects((prev) => {
                          const newSubjects = [...prev];
                          newSubjects[i] = {
                            ...newSubjects[i],
                            total_classes: {
                              ...newSubjects[i].total_classes,
                              [category]: parseInt(e.target.value) || 0,
                            },
                          };
                          return newSubjects;
                        })
                      }
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={calculate}>Calculate</Button>
    </div>
  );
}
