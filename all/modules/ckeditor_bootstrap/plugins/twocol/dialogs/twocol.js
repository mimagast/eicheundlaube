CKEDITOR.dialog.add('twocol', function(editor) {
  var breakpointClasses = [['XS', 'xs'], ['SM', 'sm'], ['MD', 'md'], ['LG', 'lg']],
    gridSizes = [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12']];

  var dialog = {
    title: editor.lang.twocol.dialog.editTitle,
    minWidth: 600,
    minHeight: 300,
    contents: [
      {
        id: 'info',
        elements: [
          {
            id: 'additionalRowClasses',
            type: 'text',
            label: editor.lang.twocol.dialog.labelAdditionalRowClasses,
            commit: function(widget) {
              widget.setData('additionalRowClasses', this.getValue());
            },
            setup: function(widget) {
              this.setValue(widget.data['additionalRowClasses']);
            }
          },
          {
            id: 'labelSetup',
            type: 'hbox',
            widths: ['40%', '30%', '30%'],
            children: [
              {
                type: 'html',
                html: ''
              },
              {
                type: 'html',
                html: '<strong>' + editor.lang.twocol.dialog.firstColumnLabel + '</strong>'
              },
              {
                type: 'html',
                html: '<strong>' + editor.lang.twocol.dialog.secondColumnLabel + '</strong>'
              }
            ]
          },
          {
            id: 'breakPointClasses',
            type: 'hbox',
            widths: ['40%', '30%', '30%'],
            children: [
              {
                type: 'html',
                html: editor.lang.twocol.dialog.chooseBreakpointLabel + ':'
              },
              {
                type: 'select',
                items: breakpointClasses,
                default: 'md',
                id: 'breakPointClass1',
                commit: function(widget) {
                  widget.setData('breakPointClass1', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['breakPointClass1'] || this['default']);
                }
              },
              {
                type: 'select',
                items: breakpointClasses,
                default: 'md',
                id: 'breakPointClass2',
                commit: function(widget) {
                  widget.setData('breakPointClass2', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['breakPointClass2'] || this['default']);
                }
              }
            ]
          },
          {
            id: 'gridSizeClasses',
            type: 'hbox',
            widths: ['40%', '30%', '30%'],
            children: [
              {
                type: 'html',
                html: editor.lang.twocol.dialog.chooseGridSizeLabel + ':'
              },
              {
                type: 'select',
                items: gridSizes,
                default: '6',
                id: 'gridSizeClass1',
                commit: function(widget) {
                  widget.setData('gridSizeClass1', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['gridSizeClass1'] || this['default']);
                }
              },
              {
                type: 'select',
                items: gridSizes,
                default: '6',
                id: 'gridSizeClass2',
                commit: function(widget) {
                  widget.setData('gridSizeClass2', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['gridSizeClass2'] || this['default']);
                }
              }
            ]
          },
          {
            id: 'colCustomClasses',
            type: 'hbox',
            widths: ['40%', '30%', '30%'],
            children: [
              {
                type: 'html',
                html: editor.lang.twocol.dialog.colCustomClassDescription
              },
              {
                type: 'text',
                id: 'colCustomClass1',
                commit: function(widget) {
                  widget.setData('colCustomClass1', this.getValue() || '');
                },
                setup: function(widget) {
                  this.setValue(widget.data['colCustomClass1']);
                }
              },
              {
                type: 'text',
                id: 'colCustomClass2',
                commit: function(widget) {
                  widget.setData('colCustomClass2', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['colCustomClass2']);
                }
              }
            ]
          }
        ]
      }
    ]
  };
  
  return dialog;
});