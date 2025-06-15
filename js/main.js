// Placeholder configuration - replace with your Supabase project credentials
const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadNavigation() {
  const { data, error } = await client
    .from('navigation')
    .select('title,url')
    .order('position');
  if (error) {
    console.error('Failed to load navigation:', error);
    return;
  }
  const navList = document.querySelector('.topnav ul');
  navList.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

async function loadProfile() {
  const { data, error } = await client
    .from('profile')
    .select('*')
    .single();
  if (error) {
    console.error('Failed to load profile:', error);
    return;
  }
  document.querySelector('.profile').src = data.image_url;
  document.querySelector('h1').textContent = data.name;
  document.querySelector('h2').textContent = data.title;
  const paragraphs = document.querySelectorAll('.profile-text p');
  if (paragraphs[0]) paragraphs[0].textContent = data.intro_line1;
  if (paragraphs[1]) paragraphs[1].textContent = data.intro_line2;
}

async function loadContact() {
  const { data, error } = await client
    .from('contact')
    .select('*')
    .single();
  if (error) {
    console.error('Failed to load contact info:', error);
    return;
  }
  document.querySelector('#contact .email').textContent = data.email;
  document.querySelector('#contact .email').href = 'mailto:' + data.email;
  document.querySelector('#contact .phone').textContent = data.phone;
  document.querySelector('#contact address').innerHTML = data.address_html;
}

async function loadFooter() {
  const { data, error } = await client
    .from('footer')
    .select('*')
    .single();
  if (error) {
    console.error('Failed to load footer:', error);
    return;
  }
  document.querySelector('#main-footer p').innerHTML = data.text;
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavigation();
  await loadProfile();
  await loadContact();
  await loadFooter();
});
