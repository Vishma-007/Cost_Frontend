import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
      FormsModule,
      ReactiveFormsModule, NavbarComponent, CommonModule,RouterModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userDetailsForm: FormGroup;
  // cities: string[] = ['City A', 'City B', 'City C']; // Example city options
  // states: string[] = ['State A', 'State B', 'State C']; // Example state options
  stateCitiesMap: { [state: string]: string[] } = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool'],
    'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Naharlagun', 'Ziro', 'Pasighat'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Munger', 'Muzaffarpur'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg'],
    'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad', 'Ambala', 'Rohtak'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Kangra'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Giridih'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Thrissur'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
    'Manipur': ['Imphal', 'Thoubal', 'Kangpokpi', 'Churachandpur'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Siaha', 'Champhai'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Mon'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'],
    'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer'],
    'Sikkim': ['Gangtok', 'Mangan', 'Jorethang'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
    'Telangana': ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad'],
    'Tripura': ['Agartala', 'Udaipur', 'Sabroom', 'Dharmanagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh'],
    'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur', 'Howrah', 'Asansol']
  };

  // Extract states from the mapping
  states: string[] = Object.keys(this.stateCitiesMap);

  // If you need to set cities based on the selected state:
  cities: string[] = [];

  // This method updates the cities based on the selected state
  // onStateChange(selectedState: string): void {
  //   this.cities = this.stateCitiesMap[selectedState] || [];
  // }
  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null; // Type assertion and null check

    if (selectElement) {
      const selectedState = selectElement.value; // Safely access the value property
      this.cities = this.stateCitiesMap[selectedState] || [];
    }
  }

  constructor(private fb: FormBuilder) {
    this.userDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      builtUpArea: ['', [Validators.required, Validators.min(1)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      constructionType: ['', [Validators.required]],
      totalFloors: ['', [Validators.required, Validators.min(1)]],
      propertyName: ['', [Validators.required]],
      landClearance: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.userDetailsForm.valid) {
      console.log('Form Submitted!', this.userDetailsForm.value);
      // Here you can handle the form submission, e.g., send data to a server
    } else {
      console.log('Form is invalid');
    }
  }
}