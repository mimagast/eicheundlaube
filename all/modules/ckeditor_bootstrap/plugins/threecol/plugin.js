CKEDITOR.plugins.add('threecol', {
  requires: 'widget',
  icons: 'threecol',
  lang: ['en', 'de'],
  init: function(editor) {
    CKEDITOR.dialog.add('threecol', this.path + 'dialogs/threecol.js');

    var widget = {
      button: editor.lang.threecol.buttonText,
      allowedContent: 'div(!threecol,!row); div(!col1); div(!col2); div(!col3)',
      requiredContent: 'div(!threecol)',
      editables: {
        col1: {
          selector: 'div.col1'
        },
        col2: {
          selector: 'div.col2'
        },
        col3: {
          selector: 'div.col3'
        }
      },
      parts: {

      },
      template:
        '<div class="row threecol">' +
          '<div class="col1">' +
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
          '</div>' +
          '<div class="col2">' +
              '<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
          '</div>' +
          '<div class="col3">' +
              '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>' +
          '</div>' +
        '</div>',
      dialog: 'threecol',
      upcast: function(element) {
        return (element.name == 'div' && element.hasClass('threecol'));
      },
      init: function() {
        var ignoreColClasses = [
            'cke_widget_element',
            'cke_widget_editable',
            'col1',
            'col2',
            'col3'
          ],
          ignoreRowClasses = [
            'row',
            'threecol',
            'cke_widget_element',
            'cke_widget_editable'
          ];

        for (var i = 1; i < 4; i++) {
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

        for (var i = 1; i < 4; i++) {
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
        this.element.addClass('row').addClass('threecol').addClass('cke_widget_element');

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

    for (var i = 1; i < 4; i++) {
      widget.parts['col' + i] = 'div.col' + i;
    }

    editor.widgets.add('threecol', widget);
  }
});
