const app = new Vue({
  el: "#app",
  data: {
    tittle: "To-Do list",
    task: [],
    newItem: "",
  },
  methods: {
    addTask() {
      if (this.newItem.length === 0) {
        Swal.fire("Please enter a valid task");
      } else {
        this.task.push({
          name: this.newItem,
          state: false,
        });
        this.newItem = "";
        localStorage.setItem("todo-list", JSON.stringify(this.task));
      }
    },
    clearDoneTask() {
      let state = this.task.filter((item) => item.state !== true);

      Swal.fire({
        title: "Do you want to delete all your done tasks?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("todo-list", JSON.stringify(state));
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          Swal.fire("Deleted!", "Your tasks has been deleted.", "success");
        }
      });
    },
    clearAllTasks() {
      Swal.fire({
        title: "Do you want to delete all your tasks?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          Swal.fire("Deleted!", "Your tasks has been deleted.", "success");
        }
      });
    },
    changeState(index) {
      this.task[index].state = true;
      localStorage.setItem("todo-list", JSON.stringify(this.task));
    },
    deleteTask(index) {
      Swal.fire({
        title: "Do you want to delete this task?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.task.splice(index, 1);
          localStorage.setItem("todo-list", JSON.stringify(this.task));
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        }
      });
    },
  },
  mounted() {
    let dataLocalStorage = JSON.parse(localStorage.getItem("todo-list"));
    if (dataLocalStorage === null) {
      this.task = [];
    } else {
      this.task = dataLocalStorage;
    }
  },
});
