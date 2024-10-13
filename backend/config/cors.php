<?php

return [
    'paths' => ['api/*', 'oauth/*'],  // Include all necessary routes
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],  // Allow frontend origin
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Authorization', 'Content-Type', 'X-Requested-With', 'Accept'],
    'exposed_headers' => ['Authorization'],  // Expose any necessary headers
    'supports_credentials' => true,  // Important: Set to true for credentialed requests
    'max_age' => 0,
];