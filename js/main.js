Vue.component('modal', {
    template: '#modal-template',
    props: {
        status1s: Array,
        status2s: Array,
        status3s: Array,
    },
    data: function() {
        return {
            entryModal: maindata.entryModal,
            chkStatus1: maindata.entryModal.status1,
            chkStatus2: maindata.entryModal.status2,
            chkStatus3: maindata.entryModal.status3,
        };
    },
    methods: {
        save: function() {
            // console.log(this.checkedStatus);
            maindata.entryModal.id = this.entryModal.id;
            maindata.entryModal.name = this.entryModal.name;
            maindata.entryModal.status1 = this.chkStatus1;
            maindata.entryModal.status2 = this.chkStatus2;
            maindata.entryModal.status3 = this.chkStatus3;
            maindata.entryModal = {
                "id": "",
                "name": "",
                "status1": [],
                "status2": [],
                "status3": []
            };
        }
    }
});

var arrGridData = [{
    id: '1',
    name: 'key1',
    status1: ['10', '11'],
    status2: ['20'],
    status3: ['31', '32']
}, {
    id: '3',
    name: 'key3',
    status1: ['10', '12'],
    status2: ['20', '21'],
    status3: ['30', '32']
}];

var maindata = {
    entryModal: {
        "id": "",
        "name": "",
        "status1": [],
        "status2": [],
        "status3": []
    },
    showModal: false,
    searchQuery: '',
    gridColumns: ['id', 'name', 'status1', 'status2', 'status3'],
    gridData: [],
    newStatus1: '',
    newStatus2: '',
    newStatus3: '',
    status1: [
        // '10', '11', '12'
    ],
    status2: [
        // '20', '21'
    ],
    status3: [
        // '30', '31', '32'
    ]
};

// bootstrap the demo
var demo = new Vue({
    el: '#demo',
    data: maindata,
    methods: {
        changeStatus1: function(finalStatus) {
            console.log(finalStatus);
            this.status1 = finalStatus;
        },
        changeStatus2: function(finalStatus) {
            console.log(finalStatus);
            this.status2 = finalStatus;
        },
        changeStatus3: function(finalStatus) {
            console.log(finalStatus);
            this.status3 = finalStatus;
        },
        saveFile: function(text) {
            var url = null;
            var data = new Blob([text], {
                type: 'text/plain;'
            });
            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (url !== null) {
                window.URL.revokeObjectURL(url);
            }

            url = window.URL.createObjectURL(data);

            var link = document.getElementById('exportText');
            link.href = url;
            var filename = window.prompt("輸入檔名") || 'export';
            link.download = filename + '.txt';
            link.click();
        },
        exportText: function() {
            var strLine = '';

            this.gridData.forEach(function(element, index) {

                Object.keys(element).forEach(function(key, index) {
                    var strObj = element[key].toString();

                    if (!!strObj) {
                        if (index === 0) {
                            strLine = strLine + strObj + '.';
                        } else if (index === 1) {
                            strLine = strLine + strObj + ':';
                        } else {
                            strLine = strLine + strObj + ',';
                        }
                    }
                    //  strLine=strLine.replace(",", "");
                });
                strLine = strLine.replace(/,/g, '');
                //strLine = strLine.slice(0, -1);
                strLine += '。\r\n';
            });

            this.saveFile(strLine);
        },
        save: function() {
            var text = JSON.stringify(maindata);
            this.saveFile(text);
        },
        addrow: function() {
            maindata.gridData.push({
                id: '',
                name: '',
                status1: [],
                status2: [],
                status3: []
            });
        },
        editRow: function(entry) {
            this.showModal = true;
            this.entryModal = entry;
        },
        removeRow: function(entry) {
            var index = this.gridData.indexOf(entry);
            this.gridData.splice(index, 1);
        },
        sortResult: function(arrResult) {
            console.log(arrResult);
            this.gridData = arrResult;
        },
        clearchk: function() {
            this.gridData.forEach(function(element) {
                element.status1 = [];
                element.status2 = [];
                element.status3 = [];
            });
        }
    }
});

//readfile
window.onload = function() {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                maindata.gridData = [];
                var objText = JSON.parse(reader.result.toString());
                objText.gridData.forEach(function(element, index) {
                    maindata.gridData.push(element);
                });
                console.log(objText);
                maindata.status1 = objText.status1;
                maindata.status2 = objText.status2;
                maindata.status3 = objText.status3;
            };

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!";
        }
    });
};
