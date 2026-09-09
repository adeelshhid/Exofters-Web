import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class WelcomePage {
  readonly appName = environment.appName;
  readonly links = environment.platformLinks;

  readonly features = [
    {
      icon: 'cube-outline',
      title: 'Know your stock',
      description: 'Track products, purchases, sales, expiry dates and stock movement in one clear workspace.'
    },
    {
      icon: 'people-outline',
      title: 'Serve customers better',
      description: 'Manage customer accounts, khata, supplier balances and payment history without the paperwork.'
    },
    {
      icon: 'analytics-outline',
      title: 'Grow with confidence',
      description: 'Use simple reports and business insights to make faster, better-informed decisions.'
    }
  ];

  readonly steps = [
    { number: '01', title: 'Create your store', description: 'Set up your business in minutes with the essentials already organized.' },
    { number: '02', title: 'Run your day', description: 'Record sales, purchases, expenses and customer payments as they happen.' },
    { number: '03', title: 'Move forward', description: 'See what is working, stay in control and keep your business moving.' }
  ];

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
