import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  operation = '';
  students: any;
  student: any = {
    roll: '',
    firstname: '',
    lastname: '',
    email: ''
  };
  isUpdate = false;
  @ViewChild('modalBox') modalBox: ElementRef;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }
  openModal(id = 0, roll = 0) {
    if (id === 0) {
      this.modalBox.nativeElement.classList.toggle('d-none')
      this.isUpdate = false;
    }
    else {
      this.isUpdate = true;
      this.studentService.getStudent(roll).subscribe(resp => {
        this.student = resp;
        this.modalBox.nativeElement.classList.toggle('d-none')
      });
    }
  }
  closeModal() {
    this.modalBox.nativeElement.classList.toggle('d-none')
  }
  onSubmit(form: any) {
    if (!this.isUpdate) {
      this.studentService.addStudent(form.value).subscribe(resp => {
        this.getStudents();
        this.closeModal()
        form.reset();
      })
    } else {
      this.studentService.updateStudent(form.value).subscribe(resp => {
        this.getStudents();
        this.closeModal()
        form.reset();
      })
    }
  }
  getStudents() {
    this.studentService.getAllStudent().subscribe(resp => {
      this.students = resp;
    })
  }
  remove(roll = 0) {
    if(confirm('Do You Remove The Student ?'))
    this.studentService.deleteStudent(roll).subscribe(resp => {
      this.getStudents();
    })
  }
}
