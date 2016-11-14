CKEDITOR.dialog.add( 'fourcol', function( editor ) {
  var breakpointClasses = [['XS', 'xs'], ['SM', 'sm'], ['MD', 'md'], ['LG', 'lg']],
    gridSizes = [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12']];
    
  var dialog = {
    title: editor.lang.fourcol.dialog.editTitle,
    minWidth: 800,
    minHeight: 300,
    contents: [
      {
        id: 'info',
        elements: [
          {
            id: 'additionalRowClasses',
            type: 'text',
            label: editor.lang.fourcol.dialog.labelAdditionalRowClasses,
            commit: function(widget) {
              widget.setData('additionalRowClasses', this.getValue());
            },
            setup: function(widget) {
              this.setValue(widget.data['additionalRowClasses']);
            }
          },
          {
            id: 'breakPointClass',
            type: 'hbox',
            widths: ['28%', '18%', '18%', '18%', '18%'],
            children: [
              {
                type: 'html',
                html: ''
              },
              {
                type: 'html',
                html: '<strong>' + editor.lang.fourcol.dialog.firstColumnLabel + '</strong>'
              },
              {
                type: 'html',
                html: '<strong>' + editor.lang.fourcol.dialog.secondColumnLabel + '</strong>'
              },
              {
                type: 'html',
                html: '<strong>' + editor.lang.fourcol.dialog.thirdColumnLabel + '</strong>'
              },
              {
                type: 'html',
                html: '<strong>' + editor.lang.fourcol.dialog.fourthColumnLabel + '</strong>'
              }
            ]
          },
          {
            id: 'breakPointClasses',
            type: 'hbox',
            widths: ['28%', '18%', '18%', '18%', '18%'],
            children: [
              {
                type: 'html',
                html: editor.lang.fourcol.dialog.chooseBreakpointLabel + ':'
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
              },
              {
                type: 'select',
                items: breakpointClasses,
                default: 'md',
                id: 'breakPointClass3',
                commit: function(widget) {
                  widget.setData('breakPointClass3', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['breakPointClass3'] || this['default']);
                }
              },
              {
                type: 'select',
                items: breakpointClasses,
                default: 'md',
                id: 'breakPointClass4',
                commit: function(widget) {
                  widget.setData('breakPointClass4', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['breakPointClass4'] || this['default']);
                }
              }
            ]
          },
          {
            id: 'gridSizeClasses',
            type: 'hbox',
            widths: ['28%', '18%', '18%', '18%', '18%'],
            children: [
              {
                type: 'html',
                html: editor.lang.fourcol.dialog.chooseGridSizeLabel + ':'
              },
              {
                type: 'select',
                items: gridSizes,
                default: '3',
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
                default: '3',
                id: 'gridSizeClass2',
                commit: function(widget) {
                  widget.setData('gridSizeClass2', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['gridSizeClass2'] || this['default']);
                }
              },
              {
                type: 'select',
                items: gridSizes,
                default: '3',
                id: 'gridSizeClass3',
                commit: function(widget) {
                  widget.setData('gridSizeClass3', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['gridSizeClass3'] || this['default']);
                }
              },
              {
                type: 'select',
                items: gridSizes,
                default: '3',
                id: 'gridSizeClass4',
                commit: function(widget) {
                  widget.setData('gridSizeClass4', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['gridSizeClass4'] || this['default']);
                }
              }
            ]
          },
          {
            id: 'colCustomClasses',
            type: 'hbox',
            widths: ['28%', '18%', '18%', '18%', '18%'],
            children: [
              {
                type: 'html',
                html: editor.lang.fourcol.dialog.colCustomClassDescription
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
              },
              {
                type: 'text',
                id: 'colCustomClass3',
                commit: function(widget) {
                  widget.setData('colCustomClass3', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['colCustomClass3']);
                }
              },
              {
                type: 'text',
                id: 'colCustomClass4',
                commit: function(widget) {
                  widget.setData('colCustomClass4', this.getValue());
                },
                setup: function(widget) {
                  this.setValue(widget.data['colCustomClass4']);
                }
              }
            ]
          }
        ]
      }
    ]
  };
  
  return dialog;
} );