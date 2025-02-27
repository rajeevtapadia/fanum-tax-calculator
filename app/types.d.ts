export interface Attendance {
  theory: number;
  lab: number;
  tutorial: number;
}

export interface Subject {
  name: string;
  attendence: Attendance;
  total_classes: Attendance;
}

export interface deeznuts {
  percent_tax_paid: number;
  percent_min_tax_required: number;
  min_tax_required: number;
  possible_fanum_tax_writeoff: number;
  percent_tax_paid_by_subject: number[];
}
