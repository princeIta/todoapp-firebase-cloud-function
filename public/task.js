class TodoApp {
    list = []

    constructor() {
        this._init()
    }

    _init() {
        this.addButton = document.getElementById("add-button-js")
        this.addButton.onclick = () => {
            this.modal = modal({
                modalId: "add-item-modal",
            })
            this.modal.open()
        }

        let startTime = ""
        let endTime = ""
        let description = ""

        const taskDescriptionInput = document.getElementById("task-input")
        const taskStart = document.getElementById("task-start")
        const taskEnd = document.getElementById("task-end")
        const okButton = document.querySelector(".modal .modal__footer-okbtn")

        taskDescriptionInput.onchange = e => {
            description = e.target.value
        }

        taskStart.onchange = e => {
            startTime = e.target.value
        }

        taskEnd.onchange = e => {
            endTime = e.target.value
        }

        okButton.onclick = (e) => {
            if (description && startTime && endTime) {
                const task = { description, startTime, endTime, isDone: false }

                this.list.push(task)

                taskDescriptionInput.value = ""
                taskStart.value = ""
                taskEnd.value = ""
                description = ""
                startTime = ""
                endTime = ""

                this.modal.close()
                this.render()
            }
        }
    }

    render() {
        this.headerUi = HeaderUi.display(new DateObject(Date.now()), this.list.length)
        this.listUi = ListUi.display(this.list)
    }
}

class HeaderUi {
    dateTime = new DateObject()

    static display(dateTime, taskCount) {
        return new HeaderUi(dateTime, taskCount).render()
    }

    constructor(dateTime, taskCount) {
        this.dateTime = dateTime
        this.taskCount = taskCount || 0
        this._init()
    }

    _init() {
        this.dateEl = document.getElementById("date-container-js")
        this.monthEl = document.getElementById("month-js")
        this.taskEl = document.getElementById("tasks-stat-js")
    }
    render() {
        this.dateEl.innerHTML = `
            <b>${this.dateTime.dayOfWeek}</b>,
            ${this.dateTime.date}
        `;
        this.taskEl.innerHTML = `
            <b>${this.taskCount}</b>
            ${this.taskCount > 1 ? "Tasks" : "Task"}
        `
        this.monthEl.innerHTML = this.dateTime.month
    }
}

class ListUi {
    static display(list) {
        return new ListUi(list).render()
    }

    constructor(list = []) {
        this.list = list
        this._init()
    }

    _init() {
        this.listEl = document.getElementById("list-items-js")
    }

    render() {
        clear(this.listEl)
        for (let li of this.list) {
            this.listEl.appendChild(
                this._bindHandlerToListItem(
                    htmlToElement(
                        this._createListItem(
                            li.description,
                            {
                                startTime: new DateObject(li.startTime).formatTimeStr(),
                                endTime: new DateObject(li.endTime).formatTimeStr()
                            },
                            { isDone: li.isDone }
                        )
                    ),
                    li
                )
            )
        }
    }

    _createListItem(description, { startTime, endTime }, options = {}) {
        const { isDone } = options
        const doneClass = isDone ? "list-item--done" : ""
        const lineThroughHTML = isDone ? "<div class='list-item__line-through'></div>" : ""
        const checkedAttr = isDone ? 'checked= "checked"' : ""

        const li = `
            <li class='list-item-wrapper'>
                <div class='list-item ${doneClass}'>
                    <label class='list-item__checkbox checkbox-container'>
                        <span class='list-item__text-wrapper'>
                            <data id='list-item__text-js'>${description}</data>
                            ${lineThroughHTML}
                        </span>
                        <input type='checkbox' ${checkedAttr}>
                        <span class='checkmark'></span>
                    </label>
                    <data class='list-item__interval' id='list-item__interval-js'>
                        <time>${startTime}</time> -
                        <time>${endTime}</time>
                    </data>
                </div>
            </li>
        `
        return li
    }

    _bindHandlerToListItem(elem, listItem) {
        if (elem instanceof Element || elem instanceof HTMLDocument) {
            const checkboxInput = elem.querySelector("input[type=\"checkbox\"]")
            checkboxInput.onchange = (e) => {
                e.preventDefault()
                listItem.isDone = e.target.checked
                this.render()
            }
        }

        return elem
    }
}

new TodoApp().render()
