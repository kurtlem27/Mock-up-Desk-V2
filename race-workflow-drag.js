(() => {
  const getWorkflowItem = target => {
    const item = target instanceof Element ? target.closest('.race-sort-list[data-race-sortable] li') : null;
    return item && item.parentElement?.matches('.race-sort-list[data-race-sortable]') ? item : null;
  };

  const placeItem = (item, target, clientY) => {
    if (!item || !target || item === target || item.parentElement !== target.parentElement) return;
    const bounds = target.getBoundingClientRect();
    const insertAfter = clientY > bounds.top + bounds.height / 2;
    target.parentElement.insertBefore(item, insertAfter ? target.nextElementSibling : target);
  };

  let nativeDragItem = null;
  let pointerDrag = null;

  document.addEventListener('dragstart', event => {
    const item = getWorkflowItem(event.target);
    if (!item) return;
    nativeDragItem = item;
    item.classList.add('is-dragging');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', item.textContent.trim());
    }
  });

  document.addEventListener('dragover', event => {
    if (!nativeDragItem) return;
    const target = getWorkflowItem(event.target);
    if (!target || target.parentElement !== nativeDragItem.parentElement) return;
    event.preventDefault();
    placeItem(nativeDragItem, target, event.clientY);
  });

  const finishNativeDrag = () => {
    nativeDragItem?.classList.remove('is-dragging');
    nativeDragItem = null;
  };
  document.addEventListener('dragend', finishNativeDrag);
  document.addEventListener('drop', finishNativeDrag);

  document.addEventListener('pointerdown', event => {
    const handle = event.target instanceof Element ? event.target.closest('.race-drag-handle') : null;
    const item = handle ? getWorkflowItem(handle) : null;
    if (!item || event.button !== 0) return;
    event.preventDefault();
    pointerDrag = { item, pointerId: event.pointerId };
    item.classList.add('is-dragging');
  });

  document.addEventListener('pointermove', event => {
    if (!pointerDrag || pointerDrag.pointerId !== event.pointerId) return;
    const target = getWorkflowItem(document.elementFromPoint(event.clientX, event.clientY));
    placeItem(pointerDrag.item, target, event.clientY);
  });

  const finishPointerDrag = event => {
    if (!pointerDrag || (event && pointerDrag.pointerId !== event.pointerId)) return;
    pointerDrag.item.classList.remove('is-dragging');
    pointerDrag = null;
  };
  document.addEventListener('pointerup', finishPointerDrag);
  document.addEventListener('pointercancel', finishPointerDrag);

  document.addEventListener('keydown', event => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    const item = getWorkflowItem(event.target);
    if (!item) return;
    const sibling = event.key === 'ArrowUp' ? item.previousElementSibling : item.nextElementSibling;
    if (!sibling) return;
    event.preventDefault();
    item.parentElement.insertBefore(item, event.key === 'ArrowUp' ? sibling : sibling.nextElementSibling);
    item.focus();
  });
})();
