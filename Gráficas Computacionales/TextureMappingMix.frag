#version 330

in vec3 InterpolatedColor; 
in vec3 PixelPosition;
in vec3 InterpolatedNormal;
in vec2 InterpolatedTexCoord;

uniform vec3 LightColor;
uniform vec3 LightPosition; 
uniform vec3 cameraPosition;
uniform sampler2D DiffuseTexture; 
uniform sampler2D DiffuseTexture2; 


out vec4 FragColor;


void main()
{
	vec3 ambiente = 0.1f * LightColor;
	vec3 normal = normalize(InterpolatedNormal);
	vec3 lightDirection = normalize(LightPosition - PixelPosition);
	float a = dot(normal, lightDirection);
	if (a < 0.0f){
		a = 0.0f;
	}
	vec3 difusa = a * LightColor;
	vec3 reflejo = reflect (-lightDirection, normal);
	vec3 vista = normalize(cameraPosition - PixelPosition);

	float b = dot(reflejo, vista);
	if (b < 0.0f){
		b = 0.0f;
	}

	vec3 especular = 0.5f * pow(b,32)  * LightColor;

	vec4 Texture = texture2D(DiffuseTexture, InterpolatedTexCoord);
	vec4 Texture2 = texture2D(DiffuseTexture2, InterpolatedTexCoord);

	vec4 MixTexture = mix(Texture, Texture2 , 0.5f);

	vec4 phongShading = vec4(ambiente + difusa + especular, 1.0f) * MixTexture;

	FragColor = phongShading;
	

	
}