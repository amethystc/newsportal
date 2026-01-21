# Magazine Not Showing on Vercel - Fix Guide

## Changes Made

### 1. **Disabled Sanity CDN Caching**
- Changed `useCdn: false` in `src/sanity/client.ts`
- This ensures fresh data is always fetched, not cached versions

### 2. **Added Error Handling & Debugging**
- Added loading state and error messages
- Added console logging to debug the issue
- The page will now show exactly what's wrong

## Next Steps - Verify Vercel Environment Variables

The most likely cause is that Vercel doesn't have the Sanity environment variables set. Here's how to fix it:

### Step 1: Check Vercel Environment Variables

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your `newsportal` project
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set for **Production**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=meyoc37a
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-14
```

### Step 2: If Variables Are Missing - Add Them

1. Click **Add New** button
2. For each variable:
   - **Key**: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value**: `meyoc37a`
   - **Environment**: Check ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

Repeat for:
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-03-14`

### Step 3: Redeploy

After adding environment variables, you MUST redeploy:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **⋮** (three dots) menu
4. Select **Redeploy**

**OR** just push a new commit (which we just did)

### Step 4: Check the Console

Once the deployment is done:
1. Visit your production site: https://yourdomain.vercel.app/magazine
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Look for the logs we added:
   - "Fetching magazines from Sanity..."
   - "Project ID: meyoc37a"
   - "Dataset: production"
   - "Magazines fetched: 1"

If you see errors, they'll show exactly what's wrong!

## Common Issues & Solutions

### Issue: Environment variables are `undefined`
**Solution**: Add them in Vercel and redeploy

### Issue: "CORS error" or "Network error"
**Solution**: Check your Sanity CORS settings at https://sanity.io/manage

### Issue: Still shows cached "No magazines"
**Solution**: 
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Try incognito/private browsing

## Test Locally First

The new error handling should help. Visit http://localhost:3000/magazine and check the console to see the debugging output.

## Need More Help?

After the Vercel deployment completes, send me:
1. A screenshot of your magazine page on production
2. A screenshot of the browser console on that page
3. A screenshot of your Vercel environment variables settings

This will help us identify the exact issue!
