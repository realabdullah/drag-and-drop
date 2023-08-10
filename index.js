document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".draggable");
    const droppable = document.querySelector(".drop-area");

    let draggedElement; // Store the currently dragged element
    let initialParent; // Store the initial parent of the dragged element
    let initialPosition; // Store the initial position of the dragged element

    draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", "Dragged Element");
            draggedElement = draggable;
            initialParent = draggable.parentElement;
            initialPosition = { left: draggable.style.left, top: draggable.style.top };
        });
    });

    droppable.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    droppable.addEventListener("drop", (event) => {
        event.preventDefault();

        if (!draggedElement) return;

        const droppableRect = droppable.getBoundingClientRect();
        const xPosition = event.clientX - droppableRect.left;
        const yPosition = event.clientY - droppableRect.top;

        // Calculate the half-width and half-height of the dragged element
        const halfWidth = draggedElement.offsetWidth / 2;
        const halfHeight = draggedElement.offsetHeight / 2;

        // Check if the dragged element is entirely within the droppable area
        if (
            xPosition >= halfWidth &&
            xPosition <= droppableRect.width - halfWidth &&
            yPosition >= halfHeight &&
            yPosition <= droppableRect.height - halfHeight
        ) {
            droppable.appendChild(draggedElement);

            // Set the position of the dragged element
            draggedElement.style.position = "absolute";
            draggedElement.style.left = xPosition - halfWidth + "px";
            draggedElement.style.top = yPosition - halfHeight + "px";
        }

        // Reset initial state
        draggedElement = null;
        initialParent = null;
        initialPosition = null;
    });

    document.addEventListener("dragend", () => {
        if (initialParent && draggedElement) {
            if (draggedElement.parentElement !== droppable) {
                initialParent.appendChild(draggedElement);
            }
            draggedElement.style.left = initialPosition.left;
            draggedElement.style.top = initialPosition.top;
        }
        draggedElement = null;
    });
});
