requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/assets/js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        // lib
        viewTpl: '/assets/template'
    },
    
    map: {
        '*': {
            'css': 'lib/require/css/css.min',
            'text': 'lib/require/text'
        }
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }
});
