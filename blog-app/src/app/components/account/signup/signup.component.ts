import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) { }

  async onSubmit() {
    const email = this.signupForm.value.email
    const password = this.signupForm.value.password
    if (email && password) {
      try {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
        this.router.navigate(['/'])
        alert('Successfully signed up!')
      } catch (error) {
        // Handle signup error here
      }
    } else {
      // Handle missing email or password here
    }
  }
}
