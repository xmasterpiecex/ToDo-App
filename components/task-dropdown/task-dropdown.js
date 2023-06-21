export function setPriority(imgName, btnPriority, priorityId) {
  const imgElement = btnPriority.querySelector('.svg');
  const src = imgElement.src.substring(0, imgElement.src.lastIndexOf('/') + 1);

  imgElement.src = `${src}${imgName}.svg`; //src + 'priority-' + event.submitter.id + '.svg';
  btnPriority.setAttribute('value', priorityId);
}

export function priorityAction(priorityId, btnPriority, priorityForm) {
  switch (priorityId) {
    case 'high': {
      setPriority('priority-' + priorityId, btnPriority, priorityId);
      priorityForm.remove();
      break;
    }
    case 'medium': {
      setPriority('priority-' + priorityId, btnPriority, priorityId);
      priorityForm.remove();
      break;
    }
    case 'low': {
      setPriority('priority-' + priorityId, btnPriority, priorityId);
      priorityForm.remove();
      break;
    }
    case 'urgent': {
      setPriority('priority-' + priorityId, btnPriority, priorityId);
      priorityForm.remove();
      break;
    }
  }
}
