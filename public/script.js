
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    fetch(`/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Task deleted successfully");
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to delete task. Please try again later.");
      });
  }
}
