var mongoManager = (function () {
    return {
        addElem: function (key, value) {
           localStorage.setItem(key, value);
        },


        delElem: function (key) {
            localStorage.removeItem(key);
            //return true;
        },

        refactorElem: function (oldKey, newKey, newValue) {
            mongoManager.delElem(oldKey);
            mongoManager.addElem(newKey, newValue);
        },

        completeElem: {
            complete: function (key) {
                let isComplete = JSON.parse(localStorage.getItem(key));
                isComplete.taskIsComplete = true;
                let strIsComplete = JSON.stringify(isComplete);
                localStorage.setItem(key, strIsComplete);
            },
            inProgress: function (key) {
                let isComplete = JSON.parse(localStorage.getItem(key));
                isComplete.taskIsComplete = false;
                let strIsComplete = JSON.stringify(isComplete);
                localStorage.setItem(key, strIsComplete);
            }
        },

        clearLocalStorage: function () {
            localStorage.clear();
            return true;
        },

        getOneElem: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },

        getAllElems: function () {
            var allElems = [];
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let tmp = mongoManager.getOneElem(key);
                allElems.push(tmp);
            }
            return allElems;
        }
    }
})();