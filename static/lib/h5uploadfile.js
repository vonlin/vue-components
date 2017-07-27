/**
 * Created by Administrator on 2017/7/19.
 */
jQuery.extend({
    initUpload: function(options) {
        var url = options.url,
            fieldName = options.fieldName,
            argu = options.argu || {},
            sizeType = options.sizeType || 'original',
            maxSize = (options.maxSize || 100) * 1024, //允许上传图片的大小(KB)
            maxNum = options.maxNum || 8,
            uploaded = options.uploaded || function(){},//已经上传的照片信息
            success = options.success, //上传成功的回调
            failure = options.failure; //上传失败的回调

        var imageExtens = ['JPEG','JPG','PNG','BMP'];

        //图片方向角
        var Orientation = null;

        var count = 0;

        jQuery("body").on('change','[name="'+fieldName+'"]',function(){
            count = 0;
            var _info = uploaded();
            if(this.files.length + _info.num > maxNum){
                _info.cb();
                return false;
            }
            if(this.files.length > 0){
                $("body").addClass("loadingBody")
                readFile(this.files);
            }

        });

        function readFile(files){
            var upload = function(param,filename){
                jQuery.ajax({
                    url: url,
                    type: 'POST',
                    data: param,
                    dataType: 'JSON',
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if(count == files.length - 1){
                            typeof success == 'function' && success(jQuery.extend(true,{},{filename: filename},data,{done: true}));
                        }else{
                            typeof success == 'function' && success(jQuery.extend(true,{},{filename: filename},data));
                        }
                        count++ ;
                        if(count < files.length){
                            createRF(files[count]);
                        }
                    },
                    error: function (info) {
                        window.alert("网络异常，请检查您的网络设置")
                    }
                });
            }

            var createRF = function(file){
                //获取照片方向角属性，用户旋转控制
                EXIF.getData(file, function() {
                    EXIF.getAllTags(this);
                    Orientation = EXIF.getTag(this, 'Orientation');
                });

                var filename = file.name;
                var reader = new FileReader();
                var type = filename.substring(filename.indexOf('.') + 1).toUpperCase()
                if(imageExtens.indexOf(type) == -1){
                    window.alert(filename + "图片的格式不支持");
                }
                reader.onload = function() {
                    var result = this.result, //result为data url的形式
                        img = new Image();
                    img.src = result;
                    var _filesize = fileSize(result);
                    if(sizeType == 'original' || (sizeType == 'compressed' && _filesize < maxSize)){
                        var param = getBlob(result,filename);      //图片直接上传
                        upload(param,filename);
                    }else{
                        img.onload  = function(){
                            var imageType = 'jpeg';
                            if(type == 'PNG'){
                                imageType = 'png';
                            }
                            var param = getBlob(compress(img,imageType,maxSize/_filesize),filename);
                            upload(param,filename);
                        };
                    }
                }
                reader.readAsDataURL(file);
            };
            createRF(files[count])
        }

        function getBlob(imgData,filename){
            var ndata = window.atob(imgData.split(",")[1]); //将base64格式的数据进行解码

            //新建一个buffer对象，用以存储图片数据
            var buffer = new Uint8Array(ndata.length);
            for(var i = 0; i < ndata.length; i++) {
                buffer[i] = ndata.charCodeAt(i);
            }

            //将buffer对象转化为Blob数据类型
            var blob = new Blob([buffer]);

            var fd = new FormData()
            fd.append(fieldName, blob,filename);
            for(var p in argu){
                fd.append(p, argu[p]);
            }
            return fd;
        }

        function compress(img,imageType,ratio) {
            var mime_type = "image/jpeg";
            if(typeof imageType !== "undefined" && imageType=="png"){
                mime_type = "image/png";
            }
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            //利用canvas进行绘图
            ctx.drawImage(img,0,0);
            //修复ios
            if (navigator.userAgent.match(/iphone/i)) {
                //如果方向角不为1，都需要进行旋转 added by lzk
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            rotateImg(img, 'left', canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            rotateImg(img, 'right', canvas);
                            break;
                        case 3://需要180度旋转
                            rotateImg(img, 'right', canvas);//转两次
                            rotateImg(img, 'right', canvas);
                            break;
                    }
                }
            }


            var data = canvas.toDataURL(mime_type, ratio); //data url的形式
            return data;
        }

        //计算文件流大小
        function fileSize(str){
            var fileSize;
            str = str.substring(22)
            if(str.indexOf('=')>0){
                var indexOf=str.indexOf('=');
                str=str.substring(0,indexOf);//把末尾的’=‘号去掉
            }

            fileSize=parseInt(str.length-(str.length/8)*2);
            return fileSize;
        }

        //对图片旋转处理
        function rotateImg(img, direction,canvas) {
            //alert(img);
            //最小与最大旋转方向，图片旋转4次后回到原方向
            var min_step = 0;
            var max_step = 3;
            //var img = document.getElementById(pid);
            if (img == null)return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错
            var height = img.height;
            var width = img.width;
            //var step = img.getAttribute('step');
            var step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //img.setAttribute('step', step);
            /*var canvas = document.getElementById('pic_' + pid);
             if (canvas == null) {
             img.style.display = 'none';
             canvas = document.createElement('canvas');
             canvas.setAttribute('id', 'pic_' + pid);
             img.parentNode.appendChild(canvas);
             }  */
            //旋转角度以弧度值为参数
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext('2d');
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
        }

    }

});