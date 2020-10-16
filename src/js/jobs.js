import { nextTick } from './utils.js';

const jobsItemNodeArray = Array.from(document.querySelectorAll('[data-jobs-item]'));
const jobsItemActiveClass = 'job-list__item--active';

const feedbackFormNode = document.querySelector('[data-feedback-form-block]');

function getFormHeight() {
  return feedbackFormNode ? feedbackFormNode.offsetHeight : 0;
}

let jobsItemActiveIndex = null;
let isMobile = window.innerWidth <= 1200;

const jobPanelHeight = 62;

function initJobs() {
  jobsItemNodeArray.forEach((jobsItemNode, jobsItemIndex) => {
    const toggleButtonNode = jobsItemNode.querySelector('[data-jobs-item-toggle]');

    toggleButtonNode.addEventListener('click', () => {
      const isJobsItemActive = jobsItemActiveIndex === jobsItemIndex;
      jobsItemActiveIndex = isJobsItemActive ? null : jobsItemIndex;

      if (!isMobile) {
        if (jobsItemActiveIndex !== null) {
          openFeedbackForm();
        } else {
          closeFeedbackForm();
        }
      }

      jobsItemNodeArray.forEach((jobsItemNode, _jobsItemIndex) => {
        if (!isJobsItemActive && jobsItemIndex === _jobsItemIndex) {
          openJobsItem(jobsItemNode);
        } else {
          closeJobsItem(jobsItemNode);
        }
      });
    });
  });
}

function openJobsItem(jobsItemNode) {
  jobsItemNode.classList.add(jobsItemActiveClass);
  setOpenJobsItemHeight(jobsItemNode);
}

function setOpenJobsItemHeight(jobsItemNode) {
  jobsItemNode.style.height = isMobile ? 'auto' : getFormHeight() + 20 + 'px';
}

export function redrawActiveJobsItem() {
  const jobsItemNode = jobsItemNodeArray[jobsItemActiveIndex];
  if (jobsItemNode) {
    setOpenJobsItemHeight(jobsItemNode);
  }
}

function closeJobsItem(jobsItemNode) {
  jobsItemNode.classList.remove(jobsItemActiveClass);
  jobsItemNode.style.height = isMobile ? 'auto' : jobPanelHeight + 'px';
}

function openFeedbackForm() {
  feedbackFormNode.style.display = 'block';

  nextTick(() => {
    feedbackFormNode.style.opacity = '1';
    if (!isMobile) {
      feedbackFormNode.style.transform = 'translateY(' + jobsItemActiveIndex * jobPanelHeight + 'px)';
    }
  });
}

function closeFeedbackForm() {
  feedbackFormNode.style.opacity = '0';
  nextTick(() => {
    feedbackFormNode.style.display = 'none';
  });
}

if (jobsItemNodeArray.length && feedbackFormNode) {
  initJobs();

  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 1200;
    if (isMobile) {
      openFeedbackForm();
      if (jobsItemActiveIndex !== null) {
        setOpenJobsItemHeight(jobsItemNodeArray[jobsItemActiveIndex]);
      }
    } else if (jobsItemActiveIndex === null) {
      closeFeedbackForm();
    }
  });
}
