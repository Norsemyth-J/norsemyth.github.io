# Windows 字体美化（折腾）指南

平时使用 macOS 和 Windows 双平台，习惯了 macOS 的字体渲染，强迫症对 Windows 平台的字体有点不能忍，所以必须彻底改造 Windows 平台下的字体。

有人可能只是不喜欢 Windows 平台下字体渲染的效果，即在低分屏幕下显示模糊，我不但不能忍受 Windows 平台的字体渲染，更重要的是对 Windows 默认的字体非常不喜欢（个人喜好，不喜勿喷），但是由于有些专业软件只有 Windows 版本，而且有时候给本科生上课不可能用 macOS 演示。最重要的是 MS Office 软件还是 Windows 平台的好用，所以有时候必须使用 Windows。

既然默认字体不能忍，那如何彻底改造呢？

特评提示：修改系统显示字体有风险，除非跟我一样有强迫症还是不要折腾了😂

Windows 默认英文字体使用 Segoe UI，中文字体使用微软雅黑，此外由于历史原因，有些软件使用宋体。

我不喜欢 Segoe UI，也不喜欢微软雅黑（常规体还可以，粗体简直不忍直视），觉得使用宋体这种衬线字体做 UI 界面的显示更是很奇葩。

既然喜欢 macOS 的字体，把它移植过来不就好了。说干就干，工具选择为 FontCreator 和 FontForge。

### 改造默认字体

使用 FontCreator 将 Segoe UI 系列字体中的大小写字母和数字替换为 Helvetica 字体中对应部分。不需要全部替换 Segoe UI 系列字体，挑常用的常规和粗体字体替换即可，符号字体等不能替换。Segoe UI Variable 字体也不能替换，否则会造成系统显示异常。

我只替换了下面几个字体：segoeui.ttf、segoeuib.ttf、segoeuii.ttf、segoeuil.ttf、seguibl.ttf。

对于微软雅黑，我是在新版 NobleScarlet 的基础上修改的，因为 NobleScarlet 默认中文字体挺好看的，我只是修改了西文部分为 Helvetica。

修改方法同上，只是使用 FontCreator 进行修改以后，需要使用 FontForge 软件将 TTF 文件合并为 TTC 文件。

对于有些古老软件使用宋体渲染，彻底改造方式是将宋体完全替换掉。这里我是使用了网上下载的一个苹方字体进行替换的。

替换的方式需要在安全模式下进行，按住 Shift 健，然后在开始菜单中选择重启，进入修复模式下的命令行，先进入 C 盘，然后使用如下命令进行字体拷贝覆盖（方括号中的路径根据自己的实际情况调整）。

```
cd [改造字体的文件夹]
xcopy [新版字体所在文件夹] C:\Windows\Fonts

```

### 注册表修改

为了安全起见，我将注册表中（计算机 \ HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts）的 Segoe UI 字体替换为 Helvetica（前提是你安装了 Helvetica 字体）。

![](https://ask.qcloudimg.com/http-save/yehe-4502457/7afa4097616b6ca12a44cc09a1aeba34.png?imageView2/2/w/1200)

在这里插入图片描述

此外，对于其他非系统显示字体，则可以直接在注册表中进行修改（比如我不喜欢 Calibri 等字体，这样 OneNote 默认使用 Calibri 字体的软件也可以使用自己喜欢的字体显示）。

接下来还要修改其他三项：

注册表（计算机 \ HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontSubstitutes）下的 MS Shell Dlg 和 MS Shell Dlg 2 修改为自己喜欢的字体

![](https://ask.qcloudimg.com/http-save/yehe-4502457/7a941440483fff2e288a7ba726e1f154.png?imageView2/2/w/1200)

在这里插入图片描述

![](https://ask.qcloudimg.com/http-save/yehe-4502457/4dc901f0c0dbadff7071232409a3bae2.png?imageView2/2/w/1200)

在这里插入图片描述

这样替换和修改以后，Windows 默认就可以显示自己喜欢的字体了，而且风格是统一的。默认的感觉是个大杂烩。

可是新的问题出现了，将宋体替换为苹方以后。Word 等文字编辑软件需要使用正常宋体怎么办？

因为系统默认显示宋体是寻找 SimSun，而中文环境下 Word 等文字软件找的是宋体。

我解决的方案是：使用 FontCreator 将苹方版的宋体的中文名称也修改为 SimSun，然后将原始的 simsun.ttc 分割为两个文件分布命名为宋体. ttf 和新宋体. ttf，然后将这两个宋体文件安装到系统字体。

接着在注册表中将注册表项中出现宋体以及新宋体字样的修改为 SimSun 和 NSimSun，我经过搜索至找到如下项目：将原来的项值都是新宋体，所以我修改为 NSimSun。

![](https://ask.qcloudimg.com/http-save/yehe-4502457/a1f3391d9394ee411f885439e665c361.png?imageView2/2/w/1200)

在这里插入图片描述

这样完成以后，系统级 UI 界面的显示有调用宋体的会去找 simsun.ttc 字体文件（修改以后中文字体名称也为 SimSun），而 Word 等文字软件则会找到宋体. ttf 字体文件（中文字体名称为宋体）。用这样的方式将两者区分开来，双方胡不干扰，都可以正常渲染。完美！

字体本身改造完了，接下来就是字体渲染了。

直接安装 MacType 即可。安装完 MacType 以后，有时候会存在部分软件字体显示异常问题，这个可以通过 MacTray 中的进程管理，将该软件加入不渲染名单即可。

这样蒸腾下来，99% 的情况下，UI 界面渲染可以达到 macOS 的程度了！终于可以安心使用 Windows 工作了！

下面给出自己魔改的字体文件地址，有需求的同学自己下载，拿走不谢！

链接: [https://pan.baidu.com/s/1AT3M9nRHfZFjEg8ARTWfjw](https://pan.baidu.com/s/1AT3M9nRHfZFjEg8ARTWfjw) 提取码: ik7i
