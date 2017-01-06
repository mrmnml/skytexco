function UploadController($scope, $http, $location, $timeout, $q) {

    var vm = this;
    vm.uploadConfig = {
        type: 'texture pack',
        name: '',
        tags: [],
        version: '',
        base: null,
        custom: false
    };

    vm.uploads = [

    ];

    // ex:

    // vm.uploadConfig = {
    //     type: 'texture pack',
    //     name: 'Noble Skyrim',
    //     tags: ['noble','rustic','realistic'],
    //     version: '1.2a',
    //     base: as098dua0s9dua09sduds

    // };

    vm.types = {
        1: 'texture pack',
        2: 'meshes'
    };

    activate();

    //

    function activate() {
console.log('asd');
    }



}