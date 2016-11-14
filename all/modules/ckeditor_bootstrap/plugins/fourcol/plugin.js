CKEDITOR.plugins.add('fourcol', {
  requires: 'widget',
  icons: 'fourcol',
  lang: ['en', 'de'],
  init: function(editor) {
    CKEDITOR.dialog.add('fourcol', this.path + 'dialogs/fourcol.js');

    var widget = {
      button: editor.lang.fourcol.buttonText,
      allowedContent: 'div(!fourcol,!row); div(!col1); div(!col2); div(!col3); div(!col4)',
      requiredContent: 'div(!fourcol)',
      editables: {
        col1: {
          selector: 'div.col1'
        },
        col2: {
          selector: 'div.col2'
        },
        col3: {
          selector: 'div.col3'
        },
        col4: {
          selector: 'div.col4'
        }
      },
      parts: {

      },
      template:
        '<div class="row fourcol">' +
          '<div class="col1">' +
            '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>' +
          '</div>' +
          '<div class="col2">' +
            '<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>' +
          '</div>' +
          '<div class="col3">' +
            '<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>' +
          '</div>' +
          '<div class="col4">' +
            '<p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>' +
          '</div>' +
        '</div>',
      dialog: 'fourcol',
      upcast: function(element) {
        return (element.name == 'div' && element.hasClass('fourcol'));
      },
      init: function() {
        var ignoreColClasses = [
            'cke_widget_element',
            'cke_widget_editable',
            'col1',
            'col2',
            'col3',
            'col4'
          ],
          ignoreRowClasses = [
            'row',
            'fourcol',
            'cke_widget_element',
            'cke_widget_editable'
          ];

        for (var i = 1; i < 5; i++) {
          var col = this.parts['col' + i];
          if (col) {
            var colClassNames = col.getAttribute('class').split(' '),
              primaryGridClass = false;

            // get the first matching col-aa-00 class name to set data

            for (var className in colClassNames) {
              if (/col\-[a-z]{2}\-[0-9]+/.test(colClassNames[className])) {
                primaryGridClass = colClassNames[className].split('-');
                colClassNames.splice(className, 1);
                break;
              }
            }

            if (primaryGridClass) {
              primaryGridClass.shift();
              this.setData('breakPointClass' + i, primaryGridClass[0]);
              this.setData('gridSizeClass' + i, primaryGridClass[1]);
            }

            // remove class names that should not be considered as additional custom class names

            for (var ignore in ignoreColClasses) {
              if (colClassNames.indexOf(ignoreColClasses[ignore]) !== -1) {
                colClassNames.splice(colClassNames.indexOf(ignoreColClasses[ignore]), 1);
              }
            }

            var customColClassNames = colClassNames.join(' ');

            if (customColClassNames.length) {
              this.setData('colCustomClass' + i, customColClassNames);
            }
          }
        }
        var rowClassNames = this.element.getAttribute('class').split(' ');

        for (var ignore in ignoreRowClasses) {
          if (rowClassNames.indexOf(ignoreRowClasses[ignore]) !== -1) {
            rowClassNames.splice(rowClassNames.indexOf(ignoreRowClasses[ignore]), 1);
          }
        }

        var customRowClassNames = rowClassNames.join(' ');

        if (customRowClassNames.length) {
          this.setData('additionalRowClasses', customRowClassNames);
        }
      },
      data: function() {

        for (var i = 1; i < 5; i++) {
          var column = this.editables['col' + i];
          column.removeAttribute('class');
          column.addClass('col-' + this.data['breakPointClass' + i] + '-' + this.data['gridSizeClass' + i]);
          column.addClass('col' + i).addClass('cke_widget_editable');

          if (this.data['colCustomClass' + i]) {
            var cclls = this.data['colCustomClass' + i].split(' ');
            for (cname in cclls) {
              if (cclls[cname] !== ' ') {
                column.addClass(cclls[cname]);
              }
            }
          }
        }

        this.element.removeAttribute('class');
        this.element.addClass('row').addClass('fourcol').addClass('cke_widget_element');

        if (this.data['additionalRowClasses']) {
          var classes = this.data['additionalRowClasses'].split(' ');
          for (cname in classes) {
            if (classes[cname] !== ' ') {
              this.element.addClass(classes[cname]);
            }
          }
        }
      }
    };

    for (var i = 1; i < 5; i++) {
      widget.parts['col' + i] = 'div.col' + i;
    }

    editor.widgets.add('fourcol', widget);
  }
});
