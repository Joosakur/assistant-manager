<!DOCTYPE html>

<html lang="en">

<#escape x as x?html>
<body>
<h1>Welcome to Assistant Manager!</h1>
<p>
    Hello ${firstName}, and thank you for registering to Assistant Manager.
</p>

<h2>Confirmation needed</h2>
<p>
    Please visit the following link to confirm your email and activate your account:
    <a href="${link}">${link}</a>
</p>
</body>
</#escape>



</html>