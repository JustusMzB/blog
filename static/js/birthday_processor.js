// static/js/birthday-processor.js
console.log('Birthday Processor: Script loaded');
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const downloadIcsBtn = document.getElementById('download-ics-btn');
    console.log('Birthday Processor: Required elements found');
    if (!fileInput || !downloadIcsBtn) {
        console.error('Birthday Processor: Required elements are missing.');
        return;
    }

    fileInput.addEventListener('change', async function(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const rows = text.split('\n').map(row => row.split(','));

            // Extract headers and find relevant columns
            const headers = rows[0].map(header => header.trim());
            const firstNameIndex = headers.indexOf('First Name');
            const middleNameIndex = headers.indexOf('Middle Name');
            const lastNameIndex = headers.indexOf('Last Name');
            const birthdayIndex = headers.indexOf('Birthday');

            if (firstNameIndex === -1 || lastNameIndex === -1 || birthdayIndex === -1) {
                alert('Invalid CSV: Missing First Name, Last Name, or Birthday column.');
                return;
            }

            // Process each row
            const processedEvents = rows.slice(1).map(row => {
                const firstName = row[firstNameIndex]?.trim() || '';
                const middleName = row[middleNameIndex]?.trim() || '';
                const lastName = row[lastNameIndex]?.trim() || '';
                const birthdayStr = row[birthdayIndex]?.trim();

                // Combine names to create the full name
                const name = [firstName, middleName, lastName].filter(n => n).join(' ');

                if (!name || !birthdayStr) return null;

                // Parse the birthday (supports both --MM-DD and full dates)
                let birthday;
                if (/^--\d{2}-\d{2}$/.test(birthdayStr)) {
                    birthday = `2000-${birthdayStr.slice(2)}`;  // Placeholder year for --MM-DD format
                } else if (!isNaN(Date.parse(birthdayStr))) {
                    birthday = new Date(birthdayStr).toISOString().split('T')[0];
                } else {
                    return null;  // Invalid date
                }

                // Format date for Google Calendar (MM/DD/YYYY)
                const formattedDate = new Date(birthday).toLocaleDateString('en-US');

                return {
                    name,
                    birthday: new Date(birthday),
                    formattedDate,
                    csvEvent: {
                        'Subject': `${name}'s Birthday`,
                        'Start Date': formattedDate,
                        'Start Time': '',
                        'End Date': formattedDate,
                        'End Time': '',
                        'All Day Event': 'TRUE',
                        'Description': '',
                        'Location': '',
                        'Private': 'TRUE',
                        'Recurrence': 'RRULE:FREQ=YEARLY'
                    }
                };
            }).filter(event => event);

            if (processedEvents.length === 0) {
                alert('No valid birthday events found in the CSV.');
                return;
            }

            // Generate ICS content
            let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Birthday Calendar Export//example.com//EN\n`;

            processedEvents.forEach(event => {
                const dtStart = event.birthday.toISOString().split('T')[0].replace(/-/g, '');
                icsContent += `BEGIN:VEVENT
SUMMARY:${event.name}'s Birthday
DTSTART;VALUE=DATE:${dtStart}
DTEND;VALUE=DATE:${dtStart}
RRULE:FREQ=YEARLY
DESCRIPTION:
LOCATION:
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT\n`;
            });

            icsContent += 'END:VCALENDAR';

            // Function to handle file download
            function downloadFile(content, filename, mimeType) {
                const blob = new Blob([content], { type: mimeType });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }

            // Show and set up download button
            downloadIcsBtn.style.display = 'block';
            downloadIcsBtn.onclick = () => downloadFile(icsContent, 'processed_birthdays.ics', 'text/calendar');

        } catch (error) {
            console.error('Error processing the file:', error);
            alert('An error occurred while processing the file. Please ensure it is a valid CSV.');
        }
    });
});
