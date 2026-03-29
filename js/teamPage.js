document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.classList.add('is-active');
        });

        member.addEventListener('mouseleave', () => {
            member.classList.remove('is-active');
        });

        member.addEventListener('focusin', () => {
            member.classList.add('is-active');
        });

        member.addEventListener('focusout', () => {
            member.classList.remove('is-active');
        });

        member.addEventListener('click', () => {
            const isAlreadyActive = member.classList.contains('is-active');

            teamMembers.forEach(item => {
                item.classList.remove('is-active');
            });

            if (!isAlreadyActive) {
                member.classList.add('is-active');
            }
        });

        member.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();

                const isAlreadyActive = member.classList.contains('is-active');

                teamMembers.forEach(item => {
                    item.classList.remove('is-active');
                });

                if (!isAlreadyActive) {
                    member.classList.add('is-active');
                }
            }
        });
    });
});