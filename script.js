const scheduleData = [
    { day: "Senin", subject: "Technopreneur", time: "08.00 - 09:40", room: "Unknow floor", lecturer: "Muhammad Jembar Jomantara" },
    { day: "Senin", subject: "Technopreneur", time: "10:00 - 11:40", room: "Unknow floor", lecturer: "Muhammad Jembar Jomantara" },
    { day: "Selasa", subject: "Sistem Operasi", time: "08.00 - 09:40", room: "205 - 2nd Floor", lecturer: "Deden Moh Alfiansyah" },
    { day: "Selasa", subject: "Sistem Operasi", time: "10:00 - 11:40", room: "Lab Computer 1 -3rd Floor", lecturer: "Deden Moh Alfiansyah" },
    { day: "Rabu", subject: "Proyek Jaringan", time: "09.00 - 12:20", room: "302 - 3rd floor", lecturer: "Deden Moh Alfiansyah" },
    // { day: "Rabu", subject: "Keamanan Komputer", time: "10:00 - 11:40", room: "Lab Computer 2 -4th Floor", lecturer: "Taufiq Hidayatullah" },
    { day: "Kamis", subject: "Metodologi Penelitian", time: "10:00 - 11:40", room: "305 - 3rd floor", lecturer: "Lila Setiyani" },
    { day: "Kamis", subject: "Sistem Terdistribusi", time: "13:00 - 14:40", room: "202 - 2nd Floor", lecturer: "Yessica Fara Desvia" },
    { day: "Jumat", subject: "Keamanan Komputer", time: "08.50 - 09:40", room: "205 - 2nd Floor", lecturer: "Anwar Hilman" },
    { day: "Jumat", subject: "Keamanan Komputer", time: "10:00 - 11:40", room: "Lab Computer 1 -3rd Floor", lecturer: "Anwar Hilman" },
    // { day: "Jumat", subject: "Jaringan Komputer 2", time: "10:00 - 11:40", room: "Lab Computer 2 -4th Floor", lecturer: "Ahmad Mubarok" },
    { day: "Sabtu", subject: "Agama", time: "07.20 - 09.00", room: "202 -2nd Floor", lecturer: "Reza Azhari Muslim" },
    { day: "Sabtu", subject: "Jaringan Komputer 2", time: "08.00 - 09:40", room: "202 -2nd Floor", lecturer: "Ahmad Mubarok" },
    { day: "Sabtu", subject: "Jaringan Komputer 2", time: "10:00 - 11:40", room: "Lab Computer 1 -3rd Floor", lecturer: "Ahmad Mubarok" },
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('schedule-container');
    const dayButtons = document.querySelectorAll('.nav-item');
    const dayHeading = document.getElementById('current-day');
    const dateHeading = document.getElementById('current-date');
    const nextClassName = document.getElementById('next-class-name');
    const totalMatkulBadge = document.getElementById('total-matkul-badge');

    // Update Date & Day
    const updateDateTime = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dayHeading.textContent = now.toLocaleDateString('id-ID', { weekday: 'long' });
        dateHeading.textContent = now.toLocaleDateString('id-ID', options);
    };

    // Render Schedule
    const renderSchedule = (filterDay = 'all') => {
        container.innerHTML = '';
        const filtered = filterDay === 'all'
            ? scheduleData
            : scheduleData.filter(item => item.day === filterDay);

        // Update Total Count (Unique Subjects Only)
        try {
            if (totalMatkulBadge) {
                const uniqueSubjects = new Set(filtered.map(item => item.subject));
                totalMatkulBadge.textContent = uniqueSubjects.size;
                console.log(`Updated counter: ${uniqueSubjects.size} unique subjects`);
            }
        } catch (err) {
            console.error("Error updating subject counter:", err);
        }

        filtered.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'schedule-card';
            card.style.animationDelay = `${index * 0.1}s`;

            // Simulating "Active/Live" class based on current time (simplified logic)
            const now = new Date();
            const currentDay = now.toLocaleDateString('id-ID', { weekday: 'long' });
            if (item.day === currentDay) {
                // In a real app, you'd compare hour/minute ranges
                // card.classList.add('active');
            }

            card.innerHTML = `
                <span class="card-subject">${item.subject}</span>
                <span class="card-time">🕒 ${item.time}</span>
                <div class="card-details">
                    <span>📍 ${item.room}</span>
                    <span>👤 ${item.lecturer}</span>
                    <span>📅 ${item.day}</span>
                </div>
            `;
            container.appendChild(card);
        });
    };

    // Filter Logic
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSchedule(btn.dataset.day);
        });
    });

    // Simple "Next Class" logic
    const findNextClass = () => {
        const now = new Date();
        const currentDay = now.toLocaleDateString('id-ID', { weekday: 'long' });
        const todayClasses = scheduleData.filter(item => item.day === currentDay);

        if (todayClasses.length > 0) {
            nextClassName.textContent = todayClasses[0].subject;
        } else {
            nextClassName.textContent = "Tidak ada kelas hari ini";
        }
    };

    updateDateTime();
    renderSchedule();
    findNextClass();
});