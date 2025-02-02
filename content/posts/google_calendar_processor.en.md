---
draft: false
date: 2025-02-02
title: 'Restore Contact Birthdays in Google Calendar with This Simple Tool'
author: 'Justus Meyer zu Bexten'
tags: [Google Calendar, Birthday Reminders, GDPR, Contacts Export, Automation, JavaScript, Hugo]
description: 'Google Calendar no longer displays contact birthdays due to GDPR regulations. Learn how to use a browser-based tool to restore recurring birthday reminders from your Google Contacts export.'
---


In the European Union, Google no longer displays the birthdays of your contacts in Google Calendar due to GDPR regulations. While this change enhances privacy, it can be inconvenient for those who rely on these reminders. To address this, I've developed a browser-based tool that processes your Google Contacts export and generates an ICS file for import into Google Calendar. This ensures your contacts' birthdays are displayed as recurring events. The tool operates entirely within your browser, ensuring no data is transmitted to any server. You can review the source code on [GitHub](https://github.com/JustusMzB/blog/blob/main/static/js/birthday_processor.js).

**How to Use the Tool:**

1. **Export Your Google Contacts:**  
   Visit Google's official guide for exporting contacts: [Export Contacts](https://support.google.com/contacts/answer/7199294). Export your contacts in CSV format.

2. **Process the CSV File:**  
   Upload your exported CSV file to the tool provided below. The tool will generate an ICS file containing recurring birthday events.

3. **Import the ICS File into Google Calendar:**  
   Refer to Google's documentation for importing events to your calendar: [Import Events to Google Calendar](https://support.google.com/calendar/answer/37118).

By following these steps, you can restore the functionality of displaying your contacts' birthdays in Google Calendar.

{{< birthday_processor >}}
