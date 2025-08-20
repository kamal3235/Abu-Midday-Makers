/*
COMPONENT: Habit Picker  — renders into #habitPicker

Goal
- Show a list of habits the user can choose to work on.
- (Later) May also show recommended next habits by category.

What to build
- Render clickable "chips" or buttons for habits.
- When the user picks one, update state via State.* and refresh the UI.

Steps
1) Find the container: const el = document.getElementById('habitPicker')
2) Build the list of habits (from /data or State).
3) On click: update State (do not use localStorage directly), then re-render what changed.

Avoid
- Editing HTML outside this section.
- Storing data anywhere except through /utilities/state.js.
*/

// Function to fetch and render categories as chips
/*

async function renderChips() {

  console.log('Starting renderChips function'); // Log 1: Check if function runs

  try {
    console.log('Fetching categories.json'); // Log 2: Check if fetch starts

    // Fetch the JSON file
    const response = await fetch('data/categories.json');
    console.log('Fetch response:', response); // Log 3: Check response object

    if (!response.ok) {
      throw new Error('Failed to fetch categories.json');
    }
    const data = await response.json();
    console.log('Parsed JSON data:', data); // Log 4: Check JSON data

    const categories = data.categories;
    console.log('Categories array:', categories); // Log 5: Check categories array

    // Get the container
    const container = document.getElementById('chip-container');
    console.log('Container element:', container); // Log 6: Check if container exists

    // Clear existing content (if any)
    container.innerHTML = '';
    console.log('Cleared container'); // Log 7: Check if container is cleared

    // Create a chip for each category
    categories.forEach(category => {
      console.log('Creating chip for:', category); // Log 8: Check each category
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.innerHTML = `
        <span class="chip-icon">${category.icon}</span>
        <span>${category.name}</span>
      `;
      // Add click event for interactivity
      chip.addEventListener('click', () => {
        console.log('Creating chip for:', category); // Log 8: Check each category
        // Toggle 'selected' class
        chip.classList.toggle('selected');
        console.log(`Selected category: ${category.name} (ID: ${category.id})`);
      });
      container.appendChild(chip);
      console.log('Appended chip:', chip); // Log 9: Check chip append

    });
    console.log('Finished rendering chips'); // Log 10: Check completion
  } catch (error) {
    console.log('Error rendering chips:', error); // Log 11: Catch error
    console.error('Error rendering chips:', error);
    container.innerHTML = '<p>Error loading categories</p>';
  }
}

// Run the function when the page loads
console.log('Adding DOMContentLoaded listener'); // Log 0: Check if listener is added

document.addEventListener('DOMContentLoaded', renderChips);

*/


//New Improved Code//

// habitPickers.js

// Function to fetch categories.json and render a list of habits
async function renderHabitPickers(containerId) {
  try {
    // Fetch the local JSON file (assume 'data/categories.json' - adjust path as needed)
    const response = await fetch('data/categories.json');
    if (!response.ok) {
      throw new Error('Failed to fetch categories.json');
    }
    const data = await response.json();
    const categories = data.categories; // Assuming JSON structure has 'categories' array with habits

    // Load selected habits from localStorage (array of habit strings)
    let selectedHabits = JSON.parse(localStorage.getItem('selectedHabits')) || [];

    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error('Container element not found');
    }
    container.innerHTML = ''; // Clear existing content

    // Render habits grouped by category as a changeable list
    categories.forEach(category => {
      // Create category header
      const categoryHeader = document.createElement('h2');
      categoryHeader.innerHTML = `<span class="category-icon">${category.icon}</span> ${category.name}`;
      container.appendChild(categoryHeader);

      // Create list for habits
      const habitList = document.createElement('ul');
      habitList.className = 'habit-list';

      category.habits.forEach(habit => {
        const habitItem = document.createElement('li');
        habitItem.className = 'habit-item';
        habitItem.dataset.habit = habit; // Store habit for selection

        // Checkbox for selection/change
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = selectedHabits.includes(habit);
        checkbox.addEventListener('change', () => {
          updateSelectedHabits(habit, checkbox.checked);
          console.log('Selected habits:', JSON.parse(localStorage.getItem('selectedHabits')));
        });

        // Habit text
        const label = document.createElement('label');
        label.textContent = habit;

        habitItem.appendChild(checkbox);
        habitItem.appendChild(label);
        habitList.appendChild(habitItem);
      });

      container.appendChild(habitList);
    });
  } catch (error) {
    console.error('Error rendering habit pickers:', error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<p>Error loading habits</p>';
    }
  }
}

// Function to update selected habits in localStorage
function updateSelectedHabits(habit, isSelected) {
  let selectedHabits = JSON.parse(localStorage.getItem('selectedHabits')) || [];
  if (isSelected) {
    if (!selectedHabits.includes(habit)) {
      selectedHabits.push(habit);
    }
  } else {
    selectedHabits = selectedHabits.filter(h => h !== habit);
  }
  localStorage.setItem('selectedHabits', JSON.stringify(selectedHabits));
}

// To use this component, call renderHabitPickers('container-id') after DOM loads
// Example usage in HTML script:
// document.addEventListener('DOMContentLoaded', () => renderHabitPickers('habit-container'));

