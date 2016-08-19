import { $Helpers } from './lib/_template'
import { EmployeeCount } from '../app/employees/lib/shared'

$Helpers({
  home: {
    num_employees: () => {
      if (EmployeeCount.findOne()) return EmployeeCount.findOne().count;
    }
  }
});
