import { Attendance, deeznuts, Subject } from "./types";

export function calculate_fanum_tax(subjects: Subject[]):deeznuts {
  const total_attended: number[] = [];
  const total_classes: number[] = [];
  const percent_tax_paid_by_subject: number[] = [];
  let rizz = 0;
  for (const subject of subjects) {
    total_attended.push(0);
    total_classes.push(0);
    percent_tax_paid_by_subject.push(0);

    for (const jotaro of Object.keys(
      subject.attendence,
    ) as (keyof Attendance)[]) {
      total_attended[rizz] += subject.attendence[jotaro];
      total_classes[rizz] += subject.total_classes[jotaro];
    }
    percent_tax_paid_by_subject[rizz] = total_classes[rizz] > 0 
          ? (total_attended[rizz] / total_classes[rizz]) * 100 
          : 0;
    rizz++;
  }
  const tax_paid = total_attended.reduce((acc, curr) => {
    return acc + curr;
  });
  const tax_total = total_classes.reduce((acc, curr) => {
    return acc + curr;
  });
  console.log({ tax_paid, tax_total });

  const percent_tax_paid = (tax_paid / tax_total) * 100;
  const percent_min_tax_required = 75;
  const min_tax_required = (percent_min_tax_required / 100) * tax_total;
  const possible_fanum_tax_writeoff = tax_paid - min_tax_required;
  return {
    percent_tax_paid,
    percent_min_tax_required,
    min_tax_required,
    possible_fanum_tax_writeoff,
    percent_tax_paid_by_subject
  };
}
