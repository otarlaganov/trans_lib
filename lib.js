(function() {
    document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">')
    document.write('<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>')
    document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>')

    // Start developer code

    var LANG_CODE_SET = ['en-AU', 'cs', 'da', 'de', 'es', 'fi', 'fr', 'hu', 'it', 'nl', 'no', 'sv']

    setTimeout(function() {
        
        $(document).ready(function() {
        
            var jsonData;
            var node;
        
        
            $.get( "https://raw.githubusercontent.com/otarlaganov/trans_lib/main/example.json", function (data) {
                jsonData = JSON.parse(data)
                
                $('h1,h2,div,p').each((i, el) => {
                    var text = $(el).html()

                    jsonData.forEach((entry) => {
                        if (Object.values(entry.translations).find((phrase) => phrase === text)) {
                            $(el).css('border', '1px dashed #ff9b00')
                            $(el).css('cursor', 'pointer')
                            $(el).data('entry-id', entry._id)
                            $(el).click((e) => {
                                var entry_id = $(e.target).data('entry-id'); console.log(entry_id)
                                node = jsonData.find(entry => entry._id === entry_id)
                                if (node) {
                                    $('#form-modal').modal('show')
                                }
                            })
                        }
                    })
                })
            })

            var html = LANG_CODE_SET.map((code) => (
                `<div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">${code}</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="input-${code}" placeholder="">
                    </div>
                </div>`
            )).join('')

            $('body').append(
                '<div id="form-modal" class="modal fade" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-dialog-centered" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                `<h5 class="modal-title">Entry ID: ${'5cf7624640175c45ffcdc73c'}</h5>` +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body">' +
                '<form>' +
                `${html}` + 
                '</form>' + 
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-primary">Save</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            )

            $('#form-modal').on('show.bs.modal', function (e) {
                if (!node) e.preventDefault()
                var modal = $(this)
                modal.find('.modal-title').text('Entry ID: ' + node._id)
                Object.keys(node.translations).forEach((code) => {
                    modal.find(`.modal-body input[id="input-${code}"]`).val(node.translations[code])
                })
            })
        })
    }, 100)
})();