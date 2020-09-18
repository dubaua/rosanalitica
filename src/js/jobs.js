let isAccordeonInitialized = false;
const jobsNodeList = document.querySelectorAll('[data-job-item]');
const jobsNodeArray = Array.from(jobsNodeList);
const jobsItemActiveClass = 'job-list__item--active';

const feedbackForm = document.querySelector('[data-feedback-form-block]');
let formHeight = feedbackForm.offsetHeight;

console.log('feedbackForm.offsetHeight', formHeight, feedbackForm.offsetHeight);

const jobPanelHeightMobile = 78;
const jobPanelHeight = 62;

function initJobs() {
  const isMobile = window.innerWidth <= 1200;

  if (jobsNodeArray.length > 0) {
    for (let jobIndex = 0; jobIndex < jobsNodeArray.length; jobIndex++) {
      const job = jobsNodeArray[jobIndex];
      const toggler = job.querySelector('[data-job-toggler]');

      toggler.addEventListener('click', () => {
        const isJobsActive = job.classList.contains(jobsItemActiveClass);

        for (let i = 0; i < jobsNodeArray.length; i++) {
          const job = jobsNodeArray[i];
          job.classList.remove(jobsItemActiveClass);
          job.style.height = isMobile
            ? jobPanelHeightMobile + 'px'
            : jobPanelHeight + 'px';

          if (!isMobile) {
            feedbackForm.style.opacity = '0';
          }
        }

        if (!isJobsActive) {
          job.classList.add(jobsItemActiveClass);

          if (isMobile) {
            job.style.height = 'auto';
          } else {
            feedbackForm.style.display = 'block';
            formHeight = feedbackForm.offsetHeight;
            job.style.height = formHeight + 20 + 'px';

            setTimeout(() => {
              feedbackForm.style.opacity = '1';
              feedbackForm.style.transform =
                'translateY(' + jobIndex * jobPanelHeight + 'px)';
            }, 10);
          }
        } else {
          feedbackForm.style.display = 'none';
        }
      });
    }

    isAccordeonInitialized = true;
  }
}

initJobs();

window.addEventListener('resize', () => {
  if (!isAccordeonInitialized) {
    initJobs();
  }
});
