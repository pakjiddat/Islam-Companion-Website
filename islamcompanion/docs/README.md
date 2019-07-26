<p><img class="img-fluid" src="https://www.pakjiddat.pk/pakjiddat/ui/images/islamcompanion-website.png" alt="Islam Companion Website" /></p>

<h3>Introduction</h3>
<p>The "<b>Islam Companion website</b>" project is a website that allows users to read Holy Quran and Hadith text. It also allows users to subscribe to Holy Quran and Hadith by email. An example of the Islam Companion website is the <a href='https://islamcompanion.pakjiddat.pk/'>Islam Companion website</a></p>

<p>The goal of the Islam Companion website is to provide a basic website that displays Holy Quran and Hadith data. The user may customize this website according to their requirements.</p>

<h3>Features</h3>
<p>The Islam Companion website has the following features:</p>
<div>
<ul>
  <li>It has a reader that displays Holy Quran verses</li>
  <li>It has a reader that displays Hadith text</li>
  <li>It allows users to get Quranic verses and Hadith by email</li>
  <li>It allows downloading Hadith database in <b>.sql</b> <b>.sqlite</b> formats</li>
  <li>It allows users of the website to send a message to the website administrator</li>
  <li>The source code is available under <a href='https://github.com/nadirlc/islam-companion-website/blob/master/LICENSE'>GPL License</a></li>
  <li>The source code is well commented, modular and easy to update</li>
</ul>
</div>

<h3>Limitations</h3>
<p>The Islam Companion website has the following limitations:</p>
<div>
<ul>
  <li>The Islam Companion website was designed using JavaScript modules which are not supported by older browsers</li>
</ul>
</div>

<h3>Requirements</h3>
<p>The Islam Companion website requires Php >= 7.2. It also requires MySQL server >= 5.6. For sending emails, the website requires the <a href='https://pear.php.net/package/Mail/'>Mail</a> and <a href='https://pear.php.net/package/Mail_Mime/'>Mail Mime</a> pear packages.</p>

<h3>Installation</h3>
<p>The following steps can be used to install the "Islam Companion" project on your own server:</p>
<div>
  <ul>
    <li>Install the <a href='https://github.com/nadirlc/islam-companion-web-api'>Islam Companion API</a></li>
    <li>Download the <a href='https://github.com/nadirlc/islam-companion-website/archive/master.zip'>source code</a> from GitHub</li>
    <li>Move the source code to the document root of a virtual host</li>
    <li>Download the contents of the database from: <a href='https://islamcompanion.pakjiddat.pk/islamcompanion/data/islamcompanion-website.sql.tar.bz2'>here</a></li>
    <li>Extract the downloaded file</li>
    <li>Create a database and import the contents of the sql file to the database. Note down the credentials used for connecting to the database</li>
    <li>Enter the database credentials in the file <b>islamcompanion/config/RequiredObjects.php</b></li>
    <li>In the file: <b>islamcompanion/Config.php</b>, on <b>line 32</b> enter the domain names that will be used to access the website</li>
    <li>Customize the following variables in the file: <b>islamcompanion/config/General.php</b>. <b>$config['app_name'], $config['dev_mode'] and $config['site_url']</b></li>
    <li>Customize the variables in the file: <b>islamcompanion/config/Custom.php</b>. The comments explain what each variable is used for</li>
    <li>Set the <b>$config['pear_folder_path']</b> variable in the file: <b>islamcompanion/config/Path.php</b>. The variable should be set to the path of the <a href='https://pear.php.net/'>pear</a> installation.</li>
    <li>Visit the website in a browser</li>
    <li>The layout and text of the website can be edited in html files inside the folder: <b>islamcompanion/ui/html</b>. For example to edit the website header, the file: <b>islamcompanion/ui/html/base/header.html</b> needs to be edited</li>
  </ul>
</div>
