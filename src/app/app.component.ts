import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  placeForm: any;
  moveForm: any;
  first = true;
  currentId: any;
  rotation = 0;
  modalShow = 'Place';
  initialMove = true;
  oppositeColor = '';

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    // initializing the form
    this.placeForm = this.fb.group({
      placeX: ['', Validators.required],
      placeY: ['', Validators.required],
      placeF: ['', Validators.required],
      placeC: ['', Validators.required],
    });
    this.moveForm = this.fb.group({
      moveX: ['', Validators.required],
    });
  }
  // show modal according to the selection
  showModal(value: any) {
    this.modalShow = value;
  }
  // placement of pawn
  placeFun() {
    if (this.placeForm.valid) {
      let value = this.placeForm.value.placeX + this.placeForm.value.placeY;
      this.currentId = parseInt(value);
      this.rotation = parseInt(this.placeForm.value.placeF);
      let firstDigitInt = parseInt(this.placeForm.value.placeX);
      let secondDigitInt = parseInt(this.placeForm.value.placeY);
      if (this.placeForm.value.placeC === 'BLACK') {
        this.oppositeColor = 'WHITE';
      } else {
        this.oppositeColor = 'BLACK';
      }
      if (
        firstDigitInt === 0 ||
        firstDigitInt === 2 ||
        firstDigitInt === 4 ||
        firstDigitInt === 6
      ) {
        if (secondDigitInt % 2 === 0) {
          // update class white
          this.updateColor('white');
        } else {
          // update class black
          this.updateColor('black');
        }
      } else {
        // update class black
        if (secondDigitInt % 2 === 0) {
          this.updateColor('black');
        } else {
          // update class white
          this.updateColor('white');
        }
      }
      this.updateImage(this.currentId.toString());
    } else {
      alert('Please provide the all values');
    }
  }
  // update the UI color
  updateColor(className: any) {
    if (className === 'white') {
      var elements = document.getElementsByClassName(
        className
      ) as HTMLCollectionOf<HTMLElement>; // get all elements
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = this.placeForm.value.placeC;
      }
      var elements = document.getElementsByClassName(
        'black'
      ) as HTMLCollectionOf<HTMLElement>; // get all elements
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = this.oppositeColor;
      }
    } else {
      var elements = document.getElementsByClassName(
        className
      ) as HTMLCollectionOf<HTMLElement>; // get all elements
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = this.placeForm.value.placeC;
      }
      var elements = document.getElementsByClassName(
        'white'
      ) as HTMLCollectionOf<HTMLElement>; // get all elements
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = this.oppositeColor;
      }
    }
  }
  moveFun() {
    if (this.initialMove) {
      if (this.moveForm.valid) {
        this.moveSteps();
      } else {
        alert('Please select the number of move');
      }
    } else {
      this.moveSteps();
    }
  }
  // move the pawn
  moveSteps() {
    let currentValue = this.currentId.toString();
    if (currentValue.length === 1) {
      currentValue = '0' + currentValue;
    }
    let firstDigit = currentValue.toString()[0];
    let secondDigit = currentValue.toString()[1];
    // move in right direction
    if (this.rotation === 90) {
      if (firstDigit === '7') {
        alert('Cannot move to right direction');
      } else {
        if (this.initialMove) {
          if (this.moveForm.value.moveX === '2') {
            this.currentId += 20;
          } else {
            this.currentId += 10;
          }
        } else {
          this.currentId += 10;
        }
        this.updateImage(this.currentId.toString());
      }
    }
    // move in down direction
    if (this.rotation === 180) {
      if (secondDigit === '0') {
        alert('Cannot move to down direction');
      } else {
        if (this.initialMove) {
          if (this.moveForm.value.moveX === '2') {
            this.currentId -= 2;
          } else {
            this.currentId -= 1;
          }
        } else {
          this.currentId -= 1;
        }
        this.updateImage(this.currentId.toString());
      }
    }
    // move in left direction
    if (this.rotation === 270) {
      if (firstDigit === '0') {
        alert('Cannot move to left direction');
      } else {
        if (this.initialMove) {
          if (this.moveForm.value.moveX === '2') {
            this.currentId -= 20;
          } else {
            this.currentId -= 10;
          }
        } else {
          this.currentId -= 10;
        }
        this.updateImage(this.currentId.toString());
      }
    }
    // move in up direction
    if (this.rotation === 0) {
      if (secondDigit === '7') {
        alert('Cannot move to up direction');
      } else {
        if (this.initialMove) {
          if (this.moveForm.value.moveX === '2') {
            this.currentId += 2;
          } else {
            this.currentId += 1;
          }
        } else {
          this.currentId += 1;
        }

        this.updateImage(this.currentId.toString());
      }
    }
    if (this.initialMove) {
      this.initialMove = false;
    }
  }
  // change the direction of pawn
  changeDirection(changeTo: any) {
    if (changeTo === 'right') {
      this.rotation += 90;
      if (this.rotation === 360) {
        this.rotation = 0;
      }
    } else {
      this.rotation -= 90;
      if (this.rotation === 360 || this.rotation === -360) {
        this.rotation = 0;
      }
      if (this.rotation === -90) {
        this.rotation = 270;
      }
      if (this.rotation === -180) {
        this.rotation = 180;
      }
      if (this.rotation === -270) {
        this.rotation = 90;
      }
    }
    let img = document.getElementById('pawnImg');
    img!.style.transform = `rotate(${this.rotation}deg)`;
  }
  // update the direction pawn movement
  updateImage(value: any) {
    if (value.length === 1) {
      value = '0' + value;
    }
    if (!this.first) {
      var el = document.getElementById('pawnImg');
      el!.parentNode!.removeChild(el!);
    }
    var elem = document.createElement('img');
    elem.setAttribute(
      'src',
      'https://cdn-0.emojis.wiki/emoji-pics/google/chess-pawn-google.png'
    );
    elem.setAttribute('height', '78');
    elem.setAttribute('width', '78');
    elem.setAttribute('id', 'pawnImg');
    document.getElementById(value)!.appendChild(elem);
    let img = document.getElementById('pawnImg');
    img!.style.transform = `rotate(${this.rotation}deg)`;
    this.first = false;
  }
  // to fetch the position
  reportFun() {
    let currentValue = this.currentId.toString();
    if (currentValue.length === 1) {
      currentValue = '0' + currentValue;
    }
    let firstDigit = currentValue.toString()[0];
    let secondDigit = currentValue.toString()[1];
    let valueRotation = '';
    if (this.rotation === 0) {
      valueRotation = 'NORTH';
    } else if (this.rotation === 90) {
      valueRotation = 'EAST';
    } else if (this.rotation === 180) {
      valueRotation = 'SOUTH';
    } else {
      valueRotation = 'WEST';
    }

    let colorOf = document.getElementById(currentValue);
    let color = colorOf?.style.backgroundColor?.toUpperCase();

    alert(
      'OUTPUT:- ' +
        firstDigit +
        ', ' +
        secondDigit +
        ', ' +
        valueRotation +
        ', ' +
        color
    );
  }
}
