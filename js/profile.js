document.addEventListener("DOMContentLoaded", () => {
  // Profile management system
  let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
  let currentProfileId = localStorage.getItem("currentProfileId") || null;

  // DOM elements
  const profileSelector = document.getElementById("profileSelector");
  const currentProfileName = document.getElementById("currentProfileName");
  const currentProfileRole = document.getElementById("currentProfileRole");
  const currentAvatar = document.getElementById("currentAvatar");
  const profileDetailsContent = document.getElementById("profileDetailsContent");
  const profileActivity = document.getElementById("profileActivity");
  const totalProfiles = document.getElementById("totalProfiles");
  const activeProfiles = document.getElementById("activeProfiles");

  // Modal elements
  const createProfileModal = new bootstrap.Modal(document.getElementById("createProfileModal"));
  const editProfileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));
  const deleteProfileModal = new bootstrap.Modal(document.getElementById("deleteProfileModal"));

  // Form elements
  const createProfileForm = document.getElementById("createProfileForm");
  const editProfileForm = document.getElementById("editProfileForm");

  // Initialize default profiles if none exist
  if (profiles.length === 0) {
    profiles = [
      {
        id: generateId(),
        name: "Admin User",
        email: "admin@library.com",
        role: "admin",
        phone: "+1 (555) 123-4567",
        department: "Administration",
        bio: "System administrator with full access to all library functions.",
        active: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      },
      {
        id: generateId(),
        name: "Sarah Johnson",
        email: "sarah.johnson@library.com",
        role: "librarian",
        phone: "+1 (555) 234-5678",
        department: "Reference Services",
        bio: "Senior librarian specializing in reference services and research assistance.",
        active: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date(Date.now() - 86400000).toISOString() // Yesterday
      },
      {
        id: generateId(),
        name: "Mike Chen",
        email: "mike.chen@library.com",
        role: "assistant",
        phone: "+1 (555) 345-6789",
        department: "Circulation",
        bio: "Assistant librarian handling circulation and student services.",
        active: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      }
    ];
    saveProfiles();
  }

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Save profiles to localStorage
  function saveProfiles() {
    try {
      localStorage.setItem("profiles", JSON.stringify(profiles));
      updateStats();
    } catch (error) {
      showToast("Error saving profiles", "danger");
    }
  }

  // Show toast notification
  function showToast(message, type = "success") {
    const toast = document.getElementById("profileToast");
    const toastMessage = document.getElementById("toastMessage");
    
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toastMessage.textContent = message;
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }

  // Update statistics
  function updateStats() {
    totalProfiles.textContent = profiles.length;
    activeProfiles.textContent = profiles.filter(p => p.active).length;
  }

  // Populate profile selector
  function populateProfileSelector() {
    profileSelector.innerHTML = '<option value="">Select Profile</option>';
    
    profiles.forEach(profile => {
      const option = document.createElement("option");
      option.value = profile.id;
      option.textContent = `${profile.name} (${profile.role})`;
      if (!profile.active) {
        option.textContent += " - Inactive";
        option.style.color = "#6c757d";
      }
      profileSelector.appendChild(option);
    });

    if (currentProfileId) {
      profileSelector.value = currentProfileId;
    }
  }

  // Get role icon
  function getRoleIcon(role) {
    const icons = {
      admin: "bi-shield-check",
      librarian: "bi-book",
      assistant: "bi-person-badge",
      student: "bi-mortarboard"
    };
    return icons[role] || "bi-person";
  }

  // Get role color
  function getRoleColor(role) {
    const colors = {
      admin: "danger",
      librarian: "primary",
      assistant: "info",
      student: "success"
    };
    return colors[role] || "secondary";
  }

  // Display profile details
  function displayProfileDetails(profile) {
    if (!profile) {
      profileDetailsContent.innerHTML = `
        <div class="text-center text-muted py-5">
          <i class="bi bi-person-plus fs-1 mb-3"></i>
          <h5>No Profile Selected</h5>
          <p>Select a profile from the sidebar or create a new one to get started.</p>
        </div>
      `;
      return;
    }

    const roleIcon = getRoleIcon(profile.role);
    const roleColor = getRoleColor(profile.role);
    const statusBadge = profile.active 
      ? '<span class="badge bg-success">Active</span>' 
      : '<span class="badge bg-secondary">Inactive</span>';

    profileDetailsContent.innerHTML = `
      <div class="row">
        <div class="col-md-4 text-center">
          <div class="profile-avatar-large mb-3">
            <i class="bi bi-person-circle fs-1 text-${roleColor}"></i>
          </div>
          <h4>${profile.name}</h4>
          <p class="text-muted mb-2">
            <i class="bi ${roleIcon}"></i> ${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </p>
          ${statusBadge}
        </div>
        <div class="col-md-8">
          <div class="row mb-3">
            <div class="col-sm-4"><strong>Email:</strong></div>
            <div class="col-sm-8">${profile.email}</div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4"><strong>Phone:</strong></div>
            <div class="col-sm-8">${profile.phone || 'Not provided'}</div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4"><strong>Department:</strong></div>
            <div class="col-sm-8">${profile.department || 'Not specified'}</div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4"><strong>Created:</strong></div>
            <div class="col-sm-8">${new Date(profile.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4"><strong>Last Login:</strong></div>
            <div class="col-sm-8">${new Date(profile.lastLogin).toLocaleString()}</div>
          </div>
          ${profile.bio ? `
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Bio:</strong></div>
              <div class="col-sm-8">${profile.bio}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Display profile activity
  function displayProfileActivity(profile) {
    if (!profile) {
      profileActivity.innerHTML = `
        <div class="text-center text-muted py-3">
          <i class="bi bi-clock-history fs-2 mb-2"></i>
          <p>No recent activity</p>
        </div>
      `;
      return;
    }

    // Generate sample activity data
    const activities = [
      {
        action: "Profile updated",
        time: new Date(Date.now() - 3600000).toLocaleString(),
        icon: "bi-pencil",
        color: "warning"
      },
      {
        action: "Logged in",
        time: new Date(profile.lastLogin).toLocaleString(),
        icon: "bi-box-arrow-in-right",
        color: "success"
      },
      {
        action: "Profile created",
        time: new Date(profile.createdAt).toLocaleString(),
        icon: "bi-person-plus",
        color: "primary"
      }
    ];

    profileActivity.innerHTML = activities.map(activity => `
      <div class="d-flex align-items-center mb-3">
        <div class="flex-shrink-0">
          <i class="bi ${activity.icon} fs-4 text-${activity.color}"></i>
        </div>
        <div class="flex-grow-1 ms-3">
          <div class="fw-bold">${activity.action}</div>
          <small class="text-muted">${activity.time}</small>
        </div>
      </div>
    `).join('');
  }

  // Switch profile
  function switchProfile(profileId) {
    currentProfileId = profileId;
    localStorage.setItem("currentProfileId", profileId);

    const profile = profiles.find(p => p.id === profileId);
    
    if (profile) {
      currentProfileName.textContent = profile.name;
      currentProfileRole.textContent = profile.role.charAt(0).toUpperCase() + profile.role.slice(1);
      currentAvatar.className = `bi bi-person-circle fs-1 text-${getRoleColor(profile.role)}`;
      
      document.getElementById("editCurrentProfile").disabled = false;
      document.getElementById("deleteCurrentProfile").disabled = false;
      
      displayProfileDetails(profile);
      displayProfileActivity(profile);
      
      // Update last login
      profile.lastLogin = new Date().toISOString();
      saveProfiles();
    } else {
      currentProfileName.textContent = "Select a Profile";
      currentProfileRole.textContent = "No role selected";
      currentAvatar.className = "bi bi-person-circle fs-1 text-primary";
      
      document.getElementById("editCurrentProfile").disabled = true;
      document.getElementById("deleteCurrentProfile").disabled = true;
      
      displayProfileDetails(null);
      displayProfileActivity(null);
    }
  }

  // Create new profile
  function createProfile(formData) {
    const newProfile = {
      id: generateId(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone || '',
      department: formData.department || '',
      bio: formData.bio || '',
      active: formData.active,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    profiles.push(newProfile);
    saveProfiles();
    populateProfileSelector();
    
    showToast(`Profile "${newProfile.name}" created successfully!`, "success");
    return newProfile.id;
  }

  // Update profile
  function updateProfile(profileId, formData) {
    const profileIndex = profiles.findIndex(p => p.id === profileId);
    if (profileIndex === -1) return false;

    profiles[profileIndex] = {
      ...profiles[profileIndex],
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone || '',
      department: formData.department || '',
      bio: formData.bio || '',
      active: formData.active
    };

    saveProfiles();
    populateProfileSelector();
    
    if (currentProfileId === profileId) {
      switchProfile(profileId);
    }
    
    showToast(`Profile "${formData.name}" updated successfully!`, "info");
    return true;
  }

  // Delete profile
  function deleteProfile(profileId) {
    const profileIndex = profiles.findIndex(p => p.id === profileId);
    if (profileIndex === -1) return false;

    const profileName = profiles[profileIndex].name;
    profiles.splice(profileIndex, 1);
    
    if (currentProfileId === profileId) {
      currentProfileId = null;
      localStorage.removeItem("currentProfileId");
      switchProfile(null);
    }
    
    saveProfiles();
    populateProfileSelector();
    
    showToast(`Profile "${profileName}" deleted successfully!`, "danger");
    return true;
  }

  // Event listeners
  profileSelector.addEventListener("change", (e) => {
    switchProfile(e.target.value);
  });

  // Create profile form
  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const formData = {
      name: document.getElementById("profileName").value.trim(),
      email: document.getElementById("profileEmail").value.trim(),
      role: document.getElementById("profileRole").value,
      phone: document.getElementById("profilePhone").value.trim(),
      department: document.getElementById("profileDepartment").value.trim(),
      bio: document.getElementById("profileBio").value.trim(),
      active: document.getElementById("profileActive").checked
    };

    if (!formData.name || !formData.email || !formData.role) {
      showToast("Please fill in all required fields", "warning");
      return;
    }

    // Check for duplicate email
    if (profiles.some(p => p.email === formData.email)) {
      showToast("Email address already exists", "warning");
      return;
    }

    const newProfileId = createProfile(formData);
    createProfileForm.reset();
    createProfileModal.hide();
    
    // Switch to new profile
    profileSelector.value = newProfileId;
    switchProfile(newProfileId);
  });

  // Edit profile
  document.getElementById("editCurrentProfile").addEventListener("click", () => {
    if (!currentProfileId) return;
    
    const profile = profiles.find(p => p.id === currentProfileId);
    if (!profile) return;

    // Populate edit form
    document.getElementById("editProfileName").value = profile.name;
    document.getElementById("editProfileEmail").value = profile.email;
    document.getElementById("editProfileRole").value = profile.role;
    document.getElementById("editProfilePhone").value = profile.phone || '';
    document.getElementById("editProfileDepartment").value = profile.department || '';
    document.getElementById("editProfileBio").value = profile.bio || '';
    document.getElementById("editProfileActive").checked = profile.active;

    editProfileModal.show();
  });

  // Update profile form
  document.getElementById("updateProfileBtn").addEventListener("click", () => {
    if (!currentProfileId) return;

    const formData = {
      name: document.getElementById("editProfileName").value.trim(),
      email: document.getElementById("editProfileEmail").value.trim(),
      role: document.getElementById("editProfileRole").value,
      phone: document.getElementById("editProfilePhone").value.trim(),
      department: document.getElementById("editProfileDepartment").value.trim(),
      bio: document.getElementById("editProfileBio").value.trim(),
      active: document.getElementById("editProfileActive").checked
    };

    if (!formData.name || !formData.email || !formData.role) {
      showToast("Please fill in all required fields", "warning");
      return;
    }

    // Check for duplicate email (excluding current profile)
    if (profiles.some(p => p.email === formData.email && p.id !== currentProfileId)) {
      showToast("Email address already exists", "warning");
      return;
    }

    updateProfile(currentProfileId, formData);
    editProfileModal.hide();
  });

  // Delete profile
  document.getElementById("deleteCurrentProfile").addEventListener("click", () => {
    if (!currentProfileId) return;
    
    const profile = profiles.find(p => p.id === currentProfileId);
    if (!profile) return;

    document.getElementById("deleteProfileName").textContent = profile.name;
    deleteProfileModal.show();
  });

  // Confirm delete
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (currentProfileId) {
      deleteProfile(currentProfileId);
      deleteProfileModal.hide();
    }
  });

  // Initialize
  populateProfileSelector();
  updateStats();
  
  if (currentProfileId) {
    switchProfile(currentProfileId);
  } else if (profiles.length > 0) {
    // Auto-select first profile
    switchProfile(profiles[0].id);
    profileSelector.value = profiles[0].id;
  }
});