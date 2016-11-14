"use strict";

(function($) {
  CKEDITOR.plugins.add('collapse', {
    requires: 'widget',
    icons: 'collapse',
    init: function(editor) {

      var widget = {
        allowedContent: 'div(!bscollapse); div(!panel-heading); h3(!panel-title); a(collapsed)[role,!data-toggle]; div(!panel-collapse); div(!panel-body)',
        requiredContent: 'div(bscollapse)',
        editables: {
          header: {
            selector: '.panel-heading h3.panel-title',
            allowedContent: 'a(collapsed)[role,data-toggle,aria-expanded]; em; b; strong'
          },
          content: {
            selector: '.panel-body'
          }
        },
        template: 
          '<div class="bscollapse panel panel-default">' +
            '<div class="panel-heading" role="tab">' +
              '<h3 class="panel-title">' +
                '<a role="button" data-toggle="collapse" class="collapsed">' +
                  'Title' +
                '</a>' +
              '</h3>' +
            '</div>' +
            '<div class="panel-collapse collapse">' +
              '<div class="panel-body">' +
                '<p>Content</p>' +
              '</div>' +
            '</div>' +
          '</div>',
        defaults: function() {
          return {
            collapseId: 'cllps' + Math.floor((Math.random() * 10000) + 1),
          };
        },
        button: 'Create a collapse',
        upcast: function(element) {
          return (element.name == 'div' && element.hasClass('bscollapse') && element.hasClass('panel'));
        },
        init: function() {
          
          if (!this.element.getId()) {
            var defaults = widget.defaults();
            this.element.$.id = defaults['collapseId'];
          }
          else {
            this.setData('collapseId', this.element.getId());
          }
          var id = this.element.getId();

          this.element.findOne('.panel-heading').setAttribute('id', 'heading' + id);
          this.element.findOne('.panel-title a').setAttribute('href', '#collapse' + id);
          this.element.findOne('.panel-title a').setAttribute('aria-controls', '#collapse' + id);
          this.element.findOne('.panel-collapse').setAttribute('id', 'collapse' + id);
          this.element.findOne('.panel-collapse').setAttribute('aria-labelledby', 'heading' + id);
        }
      };

      editor.widgets.add('collapse', widget);
      editor.addContentsCss(this.path + 'contents.css');
    }
  });

  $.each(CKEDITOR.instances, function(i) {
    var editor = CKEDITOR.instances[i];
    editor.on('blur', function() {
      if (editor && editor.window && "getFrame" in editor.window) {

        // first wrap all collapses

        var collapses = $(editor.window.getFrame().$).contents().find('.panel.panel-default').filter(function() { return !!!$(this).closest('.panel-group').length; });
        if (collapses.length) {
          $.each(collapses, function(i) {
            var el = $(this),
              wrapper = $('<div class="panel-group" role="tablist"></div>'),
              hasCKwrapper = el.parent().hasClass('cke_widget_wrapper'),
              classToSelect = hasCKwrapper ? '.cke_widget_wrapper' : '.panel-default';

            if (hasCKwrapper) {
              el = el.parent();
            }

            if (!el.closest('.panel-group').length /* && el.next(classToSelect).length */ ) {
              el.before(wrapper);
              el.nextUntil(hasCKwrapper ? ':not(:has(.panel-default))' : ':not(.panel-default)').add(el).appendTo(wrapper);
            }
          });
        }

        // combine very successors

        var groupWrappers = $(editor.window.getFrame().$).contents().find('.panel-group').filter(':has(.panel)');

        if (groupWrappers.length > 1) {
          $.each(groupWrappers, function(i) {
            var el = $(this),
              successors = el.nextUntil(':not(.panel-group)').filter(':not(.combined)');

            successors.each(function() {
              var succ = $(this);

              succ.addClass('combined').children().appendTo(el);
              succ.remove();
            });
          });
        }

        // fix empty wrappers

        var empty = $(editor.window.getFrame().$).contents().find('.panel-group').filter(function() { return !!!$(this).children().length; });
        empty.remove();
      }
    });
  });



})(jQuery);