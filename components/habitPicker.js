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
async function renderChips() {
  try {
    // Fetch the JSON file
    const response = await fetch('data/categories.json');
    if (!response.ok) {
      throw new Error('Failed to fetch categories.json');
    }
    const data = await response.json();
    const categories = data.categories;

    // Get the container
    const container = document.getElementById('chip-container');

    // Clear existing content (if any)
    container.innerHTML = '';

    // Create a chip for each category
    categories.forEach(category => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.innerHTML = `
        <span class="chip-icon">${category.icon}</span>
        <span>${category.name}</span>
      `;
      // Add click event for interactivity
      chip.addEventListener('click', () => {
        // Toggle 'selected' class
        chip.classList.toggle('selected');
        console.log(`Selected category: ${category.name} (ID: ${category.id})`);
      });
      container.appendChild(chip);
    });
  } catch (error) {
    console.error('Error rendering chips:', error);
    container.innerHTML = '<p>Error loading categories</p>';
  }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', renderChips);