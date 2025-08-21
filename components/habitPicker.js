// components/habitPicker.js
console.log('📋 habitPicker.js loading...');

export function renderHabits(categories) {
  console.log('📋 renderHabits called with categories:', categories);

  const container = document.getElementById("habit-container");
  console.log('📋 Container element:', container);

  if (!container) {
    console.error('❌ habit-container element not found!');
    return;
  }

  // Clear previous content
  container.innerHTML = "";
  console.log('📋 Container cleared');

  categories.forEach((category, index) => {
    console.log(`📋 Rendering category ${index + 1}:`, category.name);
    
    // Category card
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category-card", category.id); // 🔑 hooks for CSS
    console.log('📋 Created category div with classes:', categoryDiv.className);

    // Category title
    const title = document.createElement("h2");
    title.classList.add("category-title");
    title.textContent = `${category.icon} ${category.name}`;
    categoryDiv.appendChild(title);
    console.log('📋 Added title:', title.textContent);

    // Habit buttons
    const habitsDiv = document.createElement("div");
    habitsDiv.classList.add("habits");

    category.habits.forEach((habit, habitIndex) => {
      console.log(`📋 Creating habit button ${habitIndex + 1}:`, habit.name);
      
      const habitBtn = document.createElement("button");
      habitBtn.textContent = habit.name;
      habitBtn.classList.add("habit-btn");
      habitBtn.dataset.habitId = habit.id;
      habitsDiv.appendChild(habitBtn);
      
      console.log('📋 Added habit button:', {
        text: habitBtn.textContent,
        id: habitBtn.dataset.habitId,
        classes: habitBtn.className
      });
    });

    categoryDiv.appendChild(habitsDiv);
    container.appendChild(categoryDiv);
    
    console.log(`📋 Category ${category.name} added to container`);
  });
  
  console.log('📋 All categories rendered. Container HTML length:', container.innerHTML.length);
  console.log('📋 Container children count:', container.children.length);
}