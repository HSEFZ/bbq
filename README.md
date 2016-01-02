# 华师大二附中表白墙

## 萌萌哒表白墙Installation

对于linux/unix/mac用户:

```bash
# 对于Ubuntu用户需要：
    apt-get install git git-core gyp
# 对于CentOS用户需要：
    yum install git git-core gyp
git clone https://github.com/joyent/node
./configure
make
sudo make install
```

对于mac用户的简便安装：

1. 先安装homebrew

```bash
brew install node
```

对于windows用户：访问[NodeJS](http://nodejs.org/)，自行解决。

## 萌萌哒数据库安装

### 安装MongoDB

对于Mac用户：brew install mongodb

对于Ubuntu用户：apt-get install mongodb

对于CentOS用户：yum install mongodb

对于Windows用户：自己看着办

### 挂载MongoDB

对于Mac/Ubuntu/CentOS用户：

```bash
cd /
mkdir data
mkdir data/db
cd data/db
mongod --dbpath . &> mongodb.log &
```

## 开启服务器

进入源代码根目录后：

对于Mac/Ubuntu/CentOS用户：

```bash
npm install
npm start
```

对于Windows用户：自己看着办。


