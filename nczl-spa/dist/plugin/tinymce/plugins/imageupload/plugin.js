(function() {
    tinymce.create('tinymce.plugins.ImageUploadPlugin', {
        init : function(ed, url) {
            url = tinyMCE.activeEditor.getParam('imageupload_rel') || url;
            var imageUploadUrl = tinyMCE.activeEditor.getParam('imageupload_url');
            var head = document.getElementsByTagName('body')[0];
            var css = document.createElement('link');                       
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = root + '/plugin/tinymce/plugins/imageupload/css/style.css';
            head.appendChild(css);
            
            // Register commands
            ed.addCommand('mceImageUpload', function() {
                $('#image_upload_type').val('tinymce'); 
                $('body').append('<div class="imageUploadBg"></div>');
                
                var showImageUploadError = function(msg) {
                    $('.imageUploadError').html(msg).show();
                    removeForeground();
                };
                
                var removeForeground = function() {
                    $('.imageUploadFg').remove();
                    $('.imageUploadFgLoading').remove();
                };
                
                var removeBackground = function() {
                    $('.imageUploadBg').remove();
                    $('.imageUploadContainer').remove();
                };
                
                var container = '\
                    <div class="imageUploadContainer mce-container mce-panel mce-window">\
                        <div class="imageUploadContainerInner">\
                            <div class="mce-window-head">\
                                <div class="mce-title">上传图片</div>\
                                <button type="button" class="mce-close">x</button>\
                            </div>\
                            <form method="POST"  enctype="multipart/form-data" id="uploadImageForm">\
                            <div class="mce-container imageUploadFormContainer" hidefocus="1" tabindex="-1">\
                                <div class="mce-container-body">\
                                    <label for="image-upload-area">图片:</label>\
                                    <input type="file" name="file" id="image-upload-area" class="mce-textbox mce-placeholder" hidefocus="true" style="width: 258px;">\
                                </div>\
                                <p class="imageUploadError"></p>\
                            </div>\
                            </form>\
                            <div class="imageUploadConfirmCase mce-panel">\
                                <div class="mce-btn mce-primary">\
                                    <button role="presentation" class="imageUploadSubmit">上传</button>\
                                </div>\
                                <div class="mce-btn">\
                                    <button role="presentation" class="imageUploadClose">关闭</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                ';

                $('body').append(container);
                
                $('.imageUploadBg, .imageUploadContainer .imageUploadClose, .mce-close').on('click', function(){
                    removeForeground();
                    removeBackground();
                });
                
                $('.imageUploadSubmit').on('click', function(){
                    
                    $('.imageUploadError').html('').hide();
                    
                    if ($('#image-upload-area').val() != '') {
                        $('body').append('<div class="imageUploadFg"></div>');
                        $('body').append('<div class="imageUploadFgLoading"></div>');
                        
                        $('#uploadImageForm').form('submit', {   
                            url:imageUploadUrl,   
                            onSubmit: function(){   
                                // do some check   
                                // return false to prevent submit;   
                            },   
                            success:function(data){   
                                var result = eval("("+data+")");
                                if(result == null){
                                    showImageUploadError('An error occurred while uploading your image.');
                                    retrun ;
                                }
                                
                                var code = result.code;
                                if(code == '1'){
                                    var uplaodReturnUrl = result.data;
                                    
                                    if (uplaodReturnUrl != null) {
                                        var tpl = '<img src="%s" />';
                                        ed.insertContent(tpl.replace('%s', uplaodReturnUrl));
                                        ed.focus();
                                        removeForeground();
                                        removeBackground();
                                    } else {
                                        showImageUploadError('An unknown error occurred.');
                                    }
                                } else {
                                    showImageUploadError('An unknown error occurred.');
                                }
                            }   
                        }); 
                    } else {
                        showImageUploadError('上传出错.');
                        return ;
                    }
                   
                });
            });

            // Register buttons
            ed.addButton('imageupload', {
                title : '上传图片',
                cmd : 'mceImageUpload',
                image : root + '/plugin/tinymce/plugins/imageupload/img/icon.png'
            });
        },

        getInfo : function() {
            return {
                longname : '上传图片',
                author : 'BoxUK',
                authorurl : 'https://github.com/boxuk/tinymce-imageupload',
                infourl : 'https://github.com/boxuk/tinymce-imageupload/blob/master/README.md',
                version : '1.0.0'
            };
        }
    });

    tinymce.PluginManager.add('imageupload', tinymce.plugins.ImageUploadPlugin);
})();
