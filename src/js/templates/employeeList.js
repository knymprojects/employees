const employeeListHbs = `
<div class="table-view">
    {{#each this}}
    <div class="table-view-cell media">
        <a href="#employees/{{ id }}/read">
            <img class="media-object pull-left" src="/pics/{{pic}}">
            <div class="media-body">
                {{firstName}} {{lastName}}
                <p>{{title}}</p>
            </div>
        </a>
    </div>
    {{/each}}
</div>
`

export {employeeListHbs};