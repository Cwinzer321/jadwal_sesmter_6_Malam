const scheduleData = [
    { day: "Senin", subject: "Data Struktur", time: "17:20 - 18:00", room: "201 - 2nd Floor", lecturer: "Anwar hilman" },
    { day: "Senin", subject: "Data Struktur", time: "19:00 - 21:00", room: "Lab Computer 1 - 3rd Floor", lecturer: "Anwar hilman" },
    { day: "Senin", subject: "Technopreneur", time: "18:30 - 20:10", room: "201 - 2nd Floor", lecturer: "Muhammad Jembar Jomantara" },
    { day: "Senin", subject: "Technopreneur", time: "20:10 - 22:00", room: "201 - 2nd Floor", lecturer: "Muhammad Jembar Jomantara" },
    { day: "Selasa", subject: "Sistem Operasi", time: "18:30 - 20:10", room: "201 - 2nd Floor", lecturer: "Ahmad Mubarok" },
    { day: "Selasa", subject: "Sistem Operasi", time: "20:20 - 22:00", room: "Lab Computer 1 -3rd Floor", lecturer: "Ahmad Mubarok" },
    { day: "Rabu", subject: "Keamanan Komputer", time: "19:20 - 20:10", room: "302 - 3rd floor", lecturer: "Taufiq Hidayatullah" },
    { day: "Rabu", subject: "Keamanan Komputer", time: "20:20 - 22:00", room: "Lab Computer 2 -4th Floor", lecturer: "Taufiq Hidayatullah" },
    { day: "Kamis", subject: "Metodologi Penelitian", time: "20:00 - 10:30", room: "202", lecturer: "Devi Fajar Wati" },
    { day: "Jumat", subject: "Jaringan Komputer 2", time: "19:00 - 20:40", room: "204 -2nd Floor", lecturer: "Ahmad Mubarok" },
    { day: "Jumat", subject: "Jaringan Komputer 2", time: "20:40 - 22:20", room: "Lab Computer 2 -4th Floor", lecturer: "Ahmad Mubarok" },
    { day: "Sabtu", subject: "Agama", time: "07.20 - 09.00", room: "202 -2nd Floor", lecturer: "Reza Azhari Muslim" },
    { day: "Sabtu", subject: "Sistem Terdistribusi", time: "17:20 - 19:00", room: "204 -2nd Floor", lecturer: "Jajang Mulyana" },
    { day: "Sabtu", subject: "Proyek Jaringan", time: "19:00 - 22:20", room: "Lab Computer 1 -3rd Floor", lecturer: "Deden Moh Alfiansyah" },
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('schedule-container');
    const dayButtons = document.querySelectorAll('.nav-item');
    const dayHeading = document.getElementById('current-day');
    const dateHeading = document.getElementById('current-date');
    const nextClassName = document.getElementById('next-class-name');

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