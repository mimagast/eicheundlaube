CKEDITOR.plugins.add('twocol', {
  requires: 'widget',
  icons: 'twocol',
  lang: ['en', 'de'],
  init: function(editor) {
    CKEDITOR.dialog.add('twocol', this.path + 'dialogs/twocol.js');

    var widget = {
      button: editor.lang.twocol.buttonText,
      allowedContent: 'div(!twocol,!row); div(!col1); div(!col2)',
      requiredContent: 'div(!twocol)',
      editables: {
        col1: {
          selector: 'div.col1'
        },
        col2: {
          selector: 'div.col2'
        }
      },
      parts: {

      },
      template:
        '<div class="row twocol">' +
          '<div class="col1">' +
              '<p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>' +
          '</div>' +
          '<div class="col2">' +
              '<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>' +
          '</div>' +
        '</div>',
      dialog: 'twocol',
      upcast: function(element) {
        return (element.name == 'div' && element.hasClass('twocol'));
      },
      init: function() {
        var ignoreColClasses = [
            'cke_widget_element',
            'cke_widget_editable',
            'col1',
            'col2'
          ],
          ignoreRowClasses = [
            'row',
            'twocol',
            'cke_widget_element',
            'cke_widget_editable'
          ];

        for (var i = 1; i < 3; i++) {
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

        if (this.editables) {
          for (var i = 1; i < 3; i++) {
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
          this.element.addClass('row').addClass('twocol').addClass('cke_widget_element');

          if (this.data['additionalRowClasses']) {
            var classes = this.data['additionalRowClasses'].split(' ');
            for (cname in classes) {
              if (classes[cname] !== ' ') {
                this.element.addClass(classes[cname]);
              }
            }
          }
        }

      }
    };

    for (var i = 1; i < 3; i++) {
      widget.parts['col' + i] = 'div.col' + i;
    }

    editor.widgets.add('twocol', widget);
  }
});
