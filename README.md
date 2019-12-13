# ml-image-tool

this tool is for image batch process for matchine learning | 此工具用于机器学习的图片批量处理

```
npm i -g ml-image-tool
```

## ml-normalize-images

this tool use easyimage, it need [imagemagick](https://imagemagick.org/) installed on your OS | 此工具依赖了easyimage，需要系统安装[imagemagick](https://imagemagick.org/)

- batch rename to numbers | 批量按序号命名
- batch convert to jpg | 批量转换jpg
- batch resize under shape | 批量调整分辨率到低于机器学习所需的shape

```
ml-normalize-images [args]

Options:
  --version            Show version number                             [boolean]
  --input-folder, -i   folder with images                             [required]
  --output-folder, -o  folder to generate normalized images     [default: "out"]
  --convert-jpg, -c    convert all images to jpg format[boolean] [default: true]
  --shape-under, -s    crop images if width/height larger than specified
                                                         [number] [default: 512]
  --rename-files, -r   rename all files to increasing numbers
                                                       [boolean] [default: true]
  --num-start, -n      start number when rename            [number] [default: 1]
  --help               Show help                                       [boolean]
```

## ml-generate-imageset-txt

generate imageset | 生成训练（验证）集文件

```
ml-generate-imageset-txt [args]

Options:
  --version            Show version number                             [boolean]
  --input-folder, -i   folder with images                         [default: "."]
  --output-folder, -o  generate txt files into                    [default: "."]
  --train              percentage of the whole used for train
                       (train.txt)                       [number] [default: 0.7]
  --val                percentage of the whole used for train
                       (val.txt)                         [number] [default: 0.2]
  --random             random the orders               [boolean] [default: true]
  --help               Show help                                       [boolean]
```

## ml-image-xml-diff

check if there is image missing annotation or annotation missing image | 检查是否有图片缺失标注或者有标注文件缺失图片

```
ml-image-xml-diff [args]

Options:
  --version              Show version number                           [boolean]
  --image-folder, -i     folder with images              [default: "JPEGImages"]
  --xml-folder, -x       folder with xmls               [default: "Annotations"]
  --move-not-paired, -m  move not paired files into specified folder
                                                                   [default: ""]
  --help                 Show help                                     [boolean]
```

## ml-collect-classes

statistic labels in annotation files (list all labels and count) | 统计标注（列出所有的标注及每种的个数）

```
ml-collect-classes [args]

Options:
  --version           Show version number                              [boolean]
  --input-folder, -i  folder with xml annotation files            [default: "."]
  --move-empty, -m    move xmls without label into specified folder[default: ""]
  --find, -f          find images with specified label             [default: ""]
  --help              Show help                                        [boolean]
```


## how do I use them | 个人使用方法

1. download pictures with https://github.com/hardikvasa/google-images-download | 批量下载谷歌搜索的图片
2. batch rename, convert, resize images with `ml-normalize-images` | 使用 `ml-normalize-images` 进行统一命名、格式及尺寸
3. label images with https://github.com/tzutalin/labelImg | 使用 labelImg 来标记要检测的内容
4. clean mismatched images and annotations with `ml-image-xml-diff` | 使用 `ml-image-xml-diff` 清理没有配对的图片和标注
5. statistic annotations with `ml-collect-classes`, if more data needed go to step 1 for more pictures and more annotations, else go to 6 | 使用 `ml-collect-classes` 统计标注，如果还需要更多数据回到第 1 步下载更多图片，如果够了则进入第 6 步
6. generate imagesets with `ml-generate-imageset-txt` | 使用 `ml-generate-imageset-txt` 生成图片集文本文件
7. custom voc like dataset is ready, use in my [ease-training](https://github.com/postor/ease-training) or whatever | 到此一个自定义的 voc 格式数据集就做好了，用我的 [ease-training](https://github.com/postor/ease-training) 或者别的去训练吧

