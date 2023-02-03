jalaliDatepicker.startWatch({
    hideAfterChange: true,
    showTodayBtn: true,
    autoHide: true,
    showEmptyBtn: false,
    topSpace: 10,
    hasSecond: false,
    bottomSpace: 30,
    showCloseBtn: true,
});
const BASE_URL = "http://localhost:3000/"
var app = new Vue({
    el: '#app',
    data: {
        events: [],
        date: ""
    },
    methods: {
        async onSelectDate() {
            this.events = await this.getEVents(this.date)
            if (!this.events.length) {
                this.events = [{}]
            }
        },
        async updateDB(event) {
            if (event.id) {
                event = await this.updateEvent(event.id, event)
            } else {
                const index = this.events.findIndex(ev => ev.fakeId == event.fakeId)
                const newEvent = await this.createEvent(event)
                this.events[index] = newEvent
                this.events = [...this.events]
            }
            event = {
                ...event
            }
        },
        getEVents(date) {
            var url = new URL(BASE_URL + 'date'),
                params = {
                    date
                }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return fetch(url, {
                method: "GET",

                headers: {

                    params: {
                        date
                    }
                }
            }).then(response => response.json())
        },
        createEvent(event) {
            const newEvent = Object.assign(event, {
                date: this.date
            })
            return fetch(BASE_URL + 'date', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(newEvent)
            }).then(response => response.json())
        },
        updateEvent(id, event) {
            const newEvent = Object.assign(event, {
                date: this.date
            })
            return fetch(BASE_URL + 'date/' + id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            })
        },
        async deleteEvent(id) {
            if (!id) {
                return
            }
            await fetch(BASE_URL + 'date/' + id, {
                method: "DELETE",
            }).then(response => response.json())
            const {
                index
            } = this.binarySearch(item => item.id == id, this.events)
            this.events.splice(index, 1)
            if (!this.events.length) {
                this.addEvent()
            }
        },
        binarySearch(cb, arr) {
            let middle = arr[Math.floor(arr.length / 2)]
            let leftPart = arr.slice(0, arr.length / 2)
            let rightPart = arr.slice(arr.length / 2, arr.length)
            console.log(Math.floor(arr.length / 2));
            if (cb(middle)) {
                return {
                    value: middle,
                    index: Math.floor(arr.length / 2)
                }
            } else {
                return (cb(middle)) ?
                    this.binarySearch(cb, rightPart) : this.binarySearch(cb, leftPart)
            }
        },
        async addEvent() {

            this.events.push({
                fakeId: Math.random(),
                start: this.events.length > 0 ? this.events[this.events.length - 1].end :
                    undefined
            })
        }
    }
})