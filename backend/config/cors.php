<?php

return [

    'paths' => ['api/*', 'login', 'register', 'profile'], // Add the routes you want to enable CORS for.

    'allowed_methods' => ['*'],  // Allow all HTTP methods.

    'allowed_origins' => ['http://localhost:3000'],  // Allow your frontend's origin.

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Allow all headers.

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,  // Set to true if you are using cookies or session-based auth.

];
