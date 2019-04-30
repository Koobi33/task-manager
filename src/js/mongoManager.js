var mongoManager = (function () {
    return {
        addElem: function (key, value) {
            $.post('/tasks/add', value);
        },

        getAllElems: function () {
            $.get('/tasks', function (data) {
                    return data;
            })
        },

        getOneElem: function (key) {

            $.get('/tasks/' + key, key, function (data) {
                return data;
            })
        },
        
        refactorElem: function (oldKey, newKey, newValue) {
            let oldID = mongoManager.getOneElem(oldKey);
            let newElem = JSON.parse(newValue);
            newElem.id = oldID.id;
            $.post('/tasks/' + newElem.id + '/edit', newElem);
        },

        completeElem: {
            complete: function (key) {
                let elem = mongoManager.getOneElem(key);
                elem.taskIsComplete = true;
                $.elem('/tasks/' + elem.id + '/edit', elem);
            },
            inProgress: function (key) {
                let elem = mongoManager.getOneElem(key);
                elem.taskIsComplete = false;
                $.elem('/tasks/' + elem.id + '/edit', elem);
            }
        },

        delElem: function (key) {
            let elem = mongoManager.getOneElem(key);
            $.get('/tasks/delete/' + elem.id, elem.id);
        }

    }
})();