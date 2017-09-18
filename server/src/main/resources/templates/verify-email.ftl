<!DOCTYPE html>

<html lang="en">

<#escape x as x?html>
<body>
<h1>Tervetuloa Assistant Manager palveluun!</h1>
<p>
    Hei ${firstName}, ja kiitos rekisteröitymisestä.
</p>

<h2>Vahvistus tarvitaan</h2>
<p>
    Klikkaa oheista linkkiä vahvistaaksesi sähköpostisi ja aktivoidaksesi käyttäjätilisi:
    <a href="${link}">${link}</a>
</p>
</body>
</#escape>



</html>