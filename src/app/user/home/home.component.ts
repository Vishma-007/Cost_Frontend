import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
// import { MaterialsComponent } from '../materials/materials.component';

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
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Rajahmundry', 'Kakinada', 'Chittoor', 'Anantapur'],
    'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Naharlagun', 'Ziro', 'Pasighat', 'Roing', 'Bomdila', 'Along', 'Daporijo', 'Changlang'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur', 'Nagaon', 'Tinsukia', 'Goalpara', 'Barpeta', 'Karimganj'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Munger', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Begusarai', 'Arrah', 'Katihar'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Jagdalpur', 'Rajnandgaon', 'Raigarh', 'Ambikapur', 'Dhamtari'],
    'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Sanquelim', 'Curchorem', 'Canacona', 'Valpoi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari'],
    'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad', 'Ambala', 'Rohtak', 'Panchkula', 'Hisar', 'Karnal', 'Panipat', 'Sonipat'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Kangra', 'Mandi', 'Solan', 'Bilaspur', 'Chamba', 'Una'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Giridih', 'Hazaribagh', 'Deoghar', 'Dumka', 'Ramgarh', 'Pakur'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi', 'Dharwad', 'Gulbarga', 'Davangere', 'Bijapur', 'Ballari'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Thrissur', 'Alappuzha', 'Palakkad', 'Kollam', 'Malappuram', 'Kannur'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Ratlam', 'Chhindwara', 'Rewa'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'],
    'Manipur': ['Imphal', 'Thoubal', 'Kangpokpi', 'Churachandpur', 'Bishnupur', 'Senapati', 'Ukhrul', 'Tamenglong', 'Noney', 'Pherzawl'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Cherrapunji', 'Baghmara', 'Mairang', 'Williamnagar', 'Resubelpara', 'Nongpoh'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Siaha', 'Champhai', 'Serchhip', 'Kolasib', 'Mamit', 'Lawngtlai', 'Hnahthial', 'Saitual'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Longleng', 'Kiphire'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Puri', 'Sambalpur', 'Balasore', 'Baripada', 'Bolangir', 'Jeypore'],
    'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Pathankot', 'Moga'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara', 'Sikar', 'Pali'],
    'Sikkim': ['Gangtok', 'Mangan', 'Jorethang', 'Namchi', 'Gyalshing', 'Ravangla', 'Rangpo', 'Chungthang', 'Singtam', 'Pelling'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Nagercoil'],
    'Telangana': ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 'Mahbubnagar', 'Ramagundam', 'Adilabad', 'Siddipet', 'Mancherial'],
    'Tripura': ['Agartala', 'Udaipur', 'Sabroom', 'Dharmanagar', 'Belonia', 'Kailashahar', 'Kamalpur', 'Amarpur', 'Sonamura', 'Melaghar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Ghaziabad', 'Noida', 'Meerut', 'Aligarh', 'Moradabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh', 'Haldwani', 'Roorkee', 'Rudrapur', 'Kashipur', 'Pithoragarh', 'Almora'],
    'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur', 'Howrah', 'Asansol', 'Darjeeling', 'Bardhaman', 'Malda', 'Kharagpur', 'Jalpaiguri']
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