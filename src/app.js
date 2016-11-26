var app = angular.module('app', [])
    .controller('AppController', AppController);

function AppController($scope, $http, $location) {

    var vm = $scope;
    vm.selection = {
        packs: {
            left: 'Vanilla',
            right: 'Osmodius'
        },
        image: 0
    };
    vm.packs = null;
    vm.images = [];
    vm.getPackIndex = getPackIndex;
    vm.slider = null;
    vm.loaded = false;
    vm.getThumb = getThumb;
    vm.selectImage = selectImage;

    activate();

    function activate() {
        getAlbums();
    }

    function getAlbums() {
        $http.get($location['absUrl']() + 'albums').then(function (res) {
            vm.packs = angular.copy(res.data);
            var i = 0;
            angular.forEach(vm.packs[0].paths, function () {
                vm.images.push(i);
                i++;
            });
            vm.loaded = true;
        })
    }

    function getPackIndex(name) {
        var i = 0;
        var res;
        angular.forEach(vm.packs, function (pack) {
            if (pack.title == name) {
                res = i;
            }
            i++;
        });
        return res;
    }

    function getThumb(n) {
        return vm.packs[getPackIndex('thumbs')].paths[n];
    }

    function selectImage(n) {
        vm.selection.image = n;
    }


}